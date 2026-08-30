/**
 * File-review-tab plugin, browser half: TWO coexisting surfaces over the same
 * produced-file vocabulary —
 *
 * 1. the chat turn-tail row (the original dsh-file-review card: "Edited N
 *    files · +M -K / Undo / Review"), registered into the
 *    'conversation.chat.turnTail' chain at priority -2 so it claims the chain
 *    BEFORE dsh-better-sidebar's own -1 interception row (chain election is
 *    first-claim-wins: exactly one row ever renders, never both); and
 * 2. the 'file-review' better-sidebar tab (per-session change list + inline
 *    red/green diffs + per-turn/per-file undo).
 *
 * The Host half's undo/redo capability reaches both surfaces through the
 * package's Typert remote contribution, mounted here exactly like
 * dsh-file-review did. Every registration is wrapped in ctx.effect so fiber
 * disposal (HMR / plugin disable) unregisters cleanly.
 */
import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-runtime/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-api-remotes/client'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {} from 'dsh-better-sidebar/client/service'
import type { ConversationSnapshot, ISessions, SessionId } from '@deepseek-ai/dsh-client-runtime/client'
import type { ChatFileMentions } from '@deepseek-ai/dsh-client-ui-conversation/client'
import type { RemoteResult } from '@deepseek-ai/dsh-typert-protocol'
import type { TabDescriptor } from 'dsh-better-sidebar/client/service'
import type { FileReviewRequest, FileReviewResult } from '../change-types.ts'
import { TYPERT_REMOTE } from '../remote.ts'
import { FileReviewTab } from './FileReviewTab.tsx'
import { ProducedFiles } from './ProducedFiles.tsx'
import { normalizeSnapshot } from './snapshot-compat.ts'
import { attachLocale, en, LOCALE_NS, t, zh } from './locales.ts'
import {
  en as chatEn, NS as CHAT_NS, zh as chatZh, type DeliverablesKey,
} from './chat-locales.ts'
import { countChangedFiles, deriveSessionChanges, splitArchivedTurns } from './session-changes.ts'
import {
  deliverablesDefinition, producedFileMentions, selectProducedFiles,
} from './turn-deliverables.ts'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** Turn-tail row copy (the chat-side surface). */
    'file-review': DeliverablesKey
  }
}

/**
 * Required services: the sidebar registry, session snapshots, locale, remote,
 * and the slot registry (turn-tail chain). The conversation Definition
 * registry is deliberately NOT a static inject: its service name moved across
 * dsh releases (<= 0.1.1: root `conversationEvents`; 0.1.2-alpha.1+:
 * `uiConversation.events`), so a hard inject on either name leaves the whole
 * plugin forever "pending" on the other version and fails web boot (issue
 * #6). It is resolved dynamically in apply() instead.
 */
export const inject = [
  'betterSidebar',
  'sessions',
  'locale',
  'remote',
  'slots',
]

/** The tab icon: a modest line-diff glyph drawn at the host-given size. */
function FileReviewIcon({ size }: { readonly size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.25 2.75h6l3.5 3.5v10a1 1 0 0 1-1 1h-8.5a1 1 0 0 1-1-1V3.75a1 1 0 0 1 1-1Z" />
      <path d="M11.25 2.75v3.5h3.5" />
      <path d="M7 10h2.5M10.5 10H12M7 13h5" />
    </svg>
  )
}

interface FileReviewRemote {
  status(request: FileReviewRequest): Promise<RemoteResult<FileReviewResult>>
  apply(request: FileReviewRequest): Promise<RemoteResult<FileReviewResult>>
}

/**
 * The tab-strip badge: the number of distinct files this session changed.
 * The sidebar re-renders the tab bar constantly (and streams publish a fresh
 * snapshot reference per event), so the derivation is memoized by a cheap
 * structural fingerprint per session — streaming token flushes keep the
 * fingerprint stable and skip the full re-derive.
 */
const badgeMemo = new Map<string, { fingerprint: string; count: number | null }>()

function snapshotFingerprint(snapshot: ConversationSnapshot | null): string {
  if (snapshot === null) return 'none'
  const view = normalizeSnapshot(snapshot)
  if (view === undefined) return 'none'
  let lastEnd = 0
  for (const endSeq of view.turnEnds.values()) lastEnd = endSeq
  return `${view.nodes.length}:${view.turnEnds.size}:${lastEnd}`
}

function badgeCount(ctx: Context, sessionId: string): number | null {
  // Host and browser sessions services share one Cordis key (see
  // dsh-file-review): narrow to the browser ISessions at this boundary.
  const sessions = (ctx as unknown as { readonly sessions: ISessions }).sessions
  const session = sessions.binding(sessionId as SessionId)?.session
  const snapshot = session?.getSnapshot() ?? null
  const fingerprint = snapshotFingerprint(snapshot)
  const hit = badgeMemo.get(sessionId)
  if (hit !== undefined && hit.fingerprint === fingerprint) return hit.count
  // The badge counts the MAIN list only — auto-archived turns already read
  // their review and left the tab's active section (issue #5).
  const { main } = splitArchivedTurns(deriveSessionChanges(snapshot))
  const count = countChangedFiles(main)
  const value = count === 0 ? null : count
  badgeMemo.set(sessionId, { fingerprint, count: value })
  return value
}

/**
 * The conversation Definition registry face this plugin needs: just the
 * per-turn deliverables registration. Same shape on every dsh release — only
 * the service path to reach it moved.
 */
interface ConversationDefinitionRegistry {
  register(definition: typeof deliverablesDefinition): () => void
}

/**
 * Resolve the conversation Definition registry without statically injecting
 * it. dsh 0.1.2-alpha.1+ folds the old `conversationEvents` /
 * `conversationViews` pair into a single `uiConversation` service (the
 * registry is its `.events` property); dsh 0.1.1 and earlier expose it as the
 * standalone root `conversationEvents` service. Returns undefined when the
 * running dsh provides neither — the caller degrades instead of blocking.
 */
function resolveConversationEvents(ctx: Context): ConversationDefinitionRegistry | undefined {
  const lookup = (name: string): unknown => {
    // ctx.get() exists on newer cordis; ctx.reflect.get() is the documented
    // "read a service without the inject requirement" escape hatch on both.
    const anyCtx = ctx as unknown as { get?: (name: string) => unknown }
    if (typeof anyCtx.get === 'function') return anyCtx.get(name)
    return ctx.reflect.get(name)
  }
  const uiConversation = lookup('uiConversation') as
    | { readonly events?: ConversationDefinitionRegistry | null }
    | undefined
  if (uiConversation?.events !== undefined && uiConversation.events !== null) return uiConversation.events
  const conversationEvents = lookup('conversationEvents') as ConversationDefinitionRegistry | undefined
  if (conversationEvents !== undefined && conversationEvents !== null) return conversationEvents
  return undefined
}

/**
 * Client plugin body: attach locale, mount the Typert remote, register the
 * chat turn-tail row AND the sidebar tab.
 * @param ctx - client root context.
 */
export function apply(ctx: Context): void {
  attachLocale(ctx.locale)
  ctx.effect(() => {
    const offZh = ctx.locale.register(LOCALE_NS, 'zh', zh)
    const offEn = ctx.locale.register(LOCALE_NS, 'en', en)
    return () => { offZh(); offEn() }
  }, 'file-review-tab: tab dictionaries')

  ctx.effect(
    () => ctx.locale.register(CHAT_NS, { zh: chatZh, en: chatEn }),
    'file-review-tab: chat dictionaries',
  )

  ctx.effect(() => {
    let disposed = false
    let disposeRemote: (() => Promise<void>) | undefined
    void ctx.remote.$mount(TYPERT_REMOTE).then((dispose) => {
      if (disposed) void dispose()
      else disposeRemote = dispose
    }).catch((error: unknown) => {
      console.error('[dsh-file-review-tab] remote mount error:', error)
    })
    return () => {
      disposed = true
      if (disposeRemote !== undefined) void disposeRemote()
    }
  }, 'file-review-tab: typert remote')

  // The turn-local mutation accumulator both chat-side surfaces read: the
  // turn-tail row's select() and the prose-mention vocabulary derive from the
  // 'deliverables' Turn data this Definition publishes. Registered against
  // whichever conversation registry the running dsh exposes (see
  // resolveConversationEvents); re-registered when the owning service is
  // (re-)provided or replaced, and skipped entirely on a dsh that exposes
  // neither — the sidebar tab derives from session snapshots and keeps
  // working without it.
  let registeredOn: ConversationDefinitionRegistry | undefined
  const registerDeliverables = (): void => {
    const events = resolveConversationEvents(ctx)
    if (events === undefined || events === registeredOn) return
    registeredOn = events
    ctx.effect(
      () => events.register(deliverablesDefinition),
      'file-review-tab: deliverables definition',
    )
  }
  registerDeliverables()
  ctx.on('internal/service', (name: string) => {
    if (name === 'conversationEvents' || name === 'uiConversation') registerDeliverables()
  })

  // The chat turn-tail row — the original dsh-file-review card, verbatim.
  // priority -2 runs BEFORE dsh-better-sidebar's -1 interception row: chain
  // election is first-claim-wins in ascending priority order, so this row
  // renders and the sidebar's chip row declines (never a double row). When
  // this plugin is composed out, the -1 row (or the host fallback) takes over
  // again — the off state needs no cleanup here.
  ctx.effect(
    () => ctx.slots.inject('conversation.chat.turnTail', () => ctx.slots.register({
      name: 'conversation.chat.turnTail',
      select: selectProducedFiles,
      priority: -2,
      locale: CHAT_NS,
      registrant: 'dsh-file-review-tab',
      inject: (sessionId: string) => {
        const sessions = (ctx as unknown as { readonly sessions: ISessions }).sessions
        const projectRoot = sessions.list.getSnapshot().byId[sessionId as SessionId]?.cwd
        const invoke = async (
          method: 'status' | 'apply',
          request: FileReviewRequest,
        ): Promise<FileReviewResult> => {
          const scope = sessions.scope(sessionId as SessionId)
          if (scope === undefined) throw new Error('Session is unavailable')
          // Session scopes are minted by the client runtime and cannot
          // statically inject namespaces contributed later by feature plugins.
          // `get()` is the Cordis escape hatch for an explicitly mounted
          // dynamic service; tracing still binds the Remote call to this
          // Session scope.
          const fileReview = scope.get('remote.fileReview') as FileReviewRemote | undefined
          if (fileReview === undefined) throw new Error('File review Remote is unavailable')
          const result = await fileReview[method](request)
          if (!result.ok) throw new Error(result.error.message)
          return result.value
        }
        return {
          projectRoot,
          inspectChanges: (request: FileReviewRequest) => invoke('status', request),
          applyChanges: (request: FileReviewRequest) => invoke('apply', request),
          // 审查 button / per-file chip: open (or focus) the sidebar tab with
          // these paths pre-expanded. updateTab runs FIRST: an already-open
          // tab receives the fresh meta reference here (the tab replays the
          // expansion), while openTab below only FOCUSES an existing tab —
          // it never applies a seed's meta to one (see the sidebar service's
          // openTab: meta lands only on creation). For a not-yet-open tab
          // updateTab is a strict no-op and openTab creates the tab WITH the
          // meta. activateTab then guarantees focus either way.
          // `path` rides along only so the host treats this as a CONTENT open:
          // a collapsed side panel auto-expands to land the tab in sight
          // (type-only opens leave collapsed panels alone). The tab itself
          // never reads tab.path.
          openInSidebarTab: (paths: readonly string[], turn?: number) => {
            const sidebar = ctx.betterSidebar
            const first = paths[0]
            if (sidebar === undefined || first === undefined) return
            // `turn` anchors the deep link to one turn: the tab expands only
            // that turn's rows for these paths (a recurring path stays
            // collapsed in its other turns).
            const meta = { expandPaths: [...paths], ...(turn !== undefined ? { turn } : {}) }
            const scope = { sessionId, ...(projectRoot !== undefined ? { cwd: projectRoot } : {}) }
            sidebar.updateTab('file-review', { meta })
            sidebar.openTab({ type: 'file-review', path: first, meta }, scope)
            sidebar.activateTab('file-review', scope)
          },
        }
      },
    }, ProducedFiles)),
    'file-review-tab: turn-tail row',
  )

  // The prose side of the same vocabulary: the chat view reaches this face
  // via ctx.get, so its absence — this plugin composed out — is the off state.
  ctx.effect(() => {
    const tChat = ctx.locale.bind(CHAT_NS)
    const mentions: ChatFileMentions = {
      forClosing(owner) {
        // Same claim test the turn-tail chain entry runs: no produced files,
        // no vocabulary — the two surfaces agree by construction.
        const reviews = selectProducedFiles(owner)
        if (reviews === null) return undefined
        return producedFileMentions(
          reviews.map(review => review.path),
          owner.openFile,
          path => tChat('produced.open', { name: path }),
        )
      },
    }
    return ctx.provide('chatFileMentions', mentions)
  }, 'file-review-tab: chat file mentions')

  ctx.effect(() => ctx.betterSidebar.registerTab({
    id: 'file-review',
    title: () => t('tabTitle'),
    icon: (size: number) => <FileReviewIcon size={size} />,
    order: 35,
    single: true,
    badge: (badgeCtx, scope) => badgeCount(badgeCtx as unknown as Context, scope.sessionId),
    component: ({ ctx: tabCtx, scope, visible, tab }) => (
      <FileReviewTab
        ctx={tabCtx as unknown as Context}
        sessionId={scope.sessionId}
        cwd={scope.cwd}
        visible={visible}
        tab={tab}
      />
    ),
  } satisfies TabDescriptor), 'file-review-tab: register tab')
}
