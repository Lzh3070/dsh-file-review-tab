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
/**
 * Deletion paths named literally by one terminal command line, in argument
 * order, deduplicated. `undefined`/non-string titles and non-terminal views
 * report nothing.
 */
export declare function deletedPathsFromCommand(command: string): readonly string[];
/**
 * Deleted paths reported by one tool call view: terminal cards carry the
 * command in `title`. Every other card shape (diff/generic/…) declares no
 * deletions.
 */
export declare function deletedPaths(view: unknown): readonly string[];
//# sourceMappingURL=deleted-paths.d.ts.map