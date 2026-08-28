/**
 * Literal deletion-path extraction from terminal call views (unknown-safe).
 *
 * dsh has no dedicated delete-file tool: agents delete through the Bash/Pwsh
 * terminals, whose call views carry the raw command line in `title`. There is
 * no filesystem snapshot to consult, so this parser is deliberately
 * conservative — it only reports paths that appear VERBATIM as arguments of a
 * known deletion command:
 *
 * - command substitution (`$(…)`, backticks) or process substitution anywhere
 *   in a segment disqualifies that whole segment;
 * - glob characters (`* ? [`) or variable expansion (`$`) in an argument
 *   disqualify that argument (the affected set cannot be enumerated post
 *   hoc);
 * - shell separators (`&&`, `||`, `|`, `;`, newline) split the line so
 *   `rm a && rm b` reports both while `echo rm x` reports nothing.
 *
 * A reported path is display-only vocabulary: the file is gone, so it carries
 * no diff hunks and no undo. Directories deleted with `rm -r` surface as the
 * directory path itself.
 */

/** Commands whose literal arguments name deleted paths (POSIX + PowerShell aliases). */
const DELETERS = new Set([
  'rm', 'rmdir', 'unlink', 'shred', 'trash',
  'remove-item', 'ri', 'del', 'rd', 'erase',
])

/** PowerShell parameters whose NEXT argument is the path, not an option value. */
const PATH_PARAMETERS = /^-(path|literalpath)$/i

/** Arguments never treated as paths: glob/expansion-bearing or self/parent refs. */
function isPathlike(token: string): boolean {
  if (token === '' || token === '.' || token === '..') return false
  return !/[*?\[\]$]/.test(token)
}

/**
 * Split one command line on shell separators, honoring quotes so a `;` inside
 * a quoted argument does not split.
 */
function splitSegments(command: string): readonly string[] {
  const segments: string[] = []
  let current = ''
  let quote: '"' | "'" | null = null
  for (let at = 0; at < command.length; at += 1) {
    const char = command[at]
    if (quote !== null) {
      if (char === '\\') {
        const next = command[at + 1]
        // Only a double-quoted escaped quote matters for segmentation; every
        // other backslash (Windows paths) is literal.
        if (quote === '"' && next === '"') {
          current += char + '"'
          at += 1
          continue
        }
        current += char
        continue
      }
      if (char === quote) quote = null
      current += char
      continue
    }
    if (char === '"' || char === "'") {
      quote = char
      current += char
      continue
    }
    const two = command.slice(at, at + 2)
    if (two === '&&' || two === '||') {
      segments.push(current)
      current = ''
      at += 1
      continue
    }
    if (char === '|' || char === ';' || char === '\n') {
      segments.push(current)
      current = ''
      continue
    }
    current += char
  }
  segments.push(current)
  return segments
}

/**
 * Shell-like tokenization of one segment, quotes joined into the token.
 * Backslash semantics follow the Windows-relevant reading: inside SINGLE
 * quotes (bash/PowerShell alike) everything is literal, and unquoted
 * backslashes stay literal too (PowerShell paths); only inside DOUBLE quotes
 * does a backslash escape the closing quote or itself (bash). A trailing open
 * quote still yields the tokens gathered so far.
 */
function tokenize(segment: string): readonly string[] {
  const tokens: string[] = []
  let current = ''
  let quote: '"' | "'" | null = null
  const flush = () => {
    if (current !== '') tokens.push(current)
    current = ''
  }
  for (let at = 0; at < segment.length; at += 1) {
    const char = segment[at]
    if (char === undefined) break
    if (quote !== null) {
      if (char === '\\') {
        const next = segment[at + 1]
        if (quote === '"' && (next === '"' || next === '\\')) {
          current += next
          at += 1
          continue
        }
        current += char
        continue
      }
      if (char === quote) {
        quote = null
        continue
      }
      current += char
      continue
    }
    if (char === '"' || char === "'") {
      quote = char
      continue
    }
    if (/\s/.test(char)) {
      flush()
      continue
    }
    current += char
  }
  flush()
  return tokens
}

/**
 * Deletion paths named literally by one terminal command line, in argument
 * order, deduplicated. `undefined`/non-string titles and non-terminal views
 * report nothing.
 */
export function deletedPathsFromCommand(command: string): readonly string[] {
  const paths: string[] = []
  const seen = new Set<string>()
  // PowerShell passes comma-separated lists as separate arguments
  // (`rm 'a.txt','b.txt'`); a comma may also just live in a filename, so each
  // part still passes the same pathlike filter.
  const accept = (raw: string): void => {
    for (const part of raw.split(',')) {
      if (!isPathlike(part) || seen.has(part)) continue
      seen.add(part)
      paths.push(part)
    }
  }
  for (const segment of splitSegments(command)) {
    // Command/process substitution: the affected paths are unknowable.
    if (segment.includes('$(') || segment.includes('`') || segment.includes('<(')) continue
    const tokens = tokenize(segment)
    // Leading environment assignments (`FOO=1 rm x`) precede the command.
    let at = 0
    while (at < tokens.length) {
      const head = tokens[at]
      if (head === undefined || !/^[A-Za-z_][A-Za-z0-9_]*=/.test(head)) break
      at += 1
    }
    const commandWord = tokens[at]
    if (commandWord === undefined) continue
    const basename = commandWord.slice(Math.max(commandWord.lastIndexOf('/'), commandWord.lastIndexOf('\\')) + 1)
    if (!DELETERS.has(basename.toLowerCase())) continue
    for (let index = at + 1; index < tokens.length; index += 1) {
      const token = tokens[index]
      if (token === undefined) continue
      if (token.startsWith('-')) {
        if (PATH_PARAMETERS.test(token) && index + 1 < tokens.length) {
          index += 1
          const named = tokens[index]
          if (named !== undefined) accept(named)
        }
        continue
      }
      accept(token)
    }
  }
  return paths
}

/**
 * Deleted paths reported by one tool call view: terminal cards carry the
 * command in `title`. Every other card shape (diff/generic/…) declares no
 * deletions.
 */
export function deletedPaths(view: unknown): readonly string[] {
  if (typeof view !== 'object' || view === null || Array.isArray(view)) return []
  const record = view as Record<string, unknown>
  if (record.card !== 'terminal' || typeof record.title !== 'string') return []
  return deletedPathsFromCommand(record.title)
}
