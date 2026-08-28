// ProducedFiles: the review card a finished turn ends with. Paths and hunks
// come from mutation-tool results, never from the closing prose.
//
// Sidebar-tab port: the original Review DRAWER (a host-grid details-column
// hijack) is removed — it fought the better-sidebar panel for the same screen
// edge. The 审查 button and the per-file chips now open the plugin's
// better-sidebar 'file-review' tab instead, carrying the turn's paths (or the
// one clicked path) as `meta.expandPaths` so the tab expands exactly those
// diffs. The Undo/Reapply toggle is unchanged.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots'
import type { TurnTailOwnerProps } from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {
  FileReviewAction, FileReviewRequest, FileReviewResult,
} from '../change-types.ts'
import { basename, type ProducedFileReview } from './turn-deliverables.ts'
import type { NS } from './chat-locales.ts'
import { summarizeDiffs, type UnifiedDiffStats } from './UnifiedDiff.tsx'
import css from './ProducedFiles.module.css'

/** Keep the turn-tail card compact; the sidebar tab always lists every file. */
const SHOWN_LIMIT = 6
const SUCCESS_NOTICE_DURATION = 2000
const ERROR_NOTICE_DURATION = 5000

interface NoticeFile {
  readonly path: string
}

interface ToggleNotice {
  readonly seq: number
  readonly tone: 'success' | 'error'
  readonly title: string
  readonly description?: string | undefined
  readonly files: readonly NoticeFile[]
}

/** Matched file reviews plus the opener and locale supplied by the turn-tail slot. */
export type ProducedFilesProps = Pick<TurnTailOwnerProps, 'openFile' | 'turn'> & {
  matched: readonly ProducedFileReview[]
  /** Session workspace root (reserved; the chat card shows tool paths verbatim). */
  projectRoot?: string | undefined
  inspectChanges?: (request: FileReviewRequest) => Promise<FileReviewResult>
  applyChanges?: (request: FileReviewRequest) => Promise<FileReviewResult>
  /**
   * Open the plugin's sidebar tab with the given paths pre-expanded
   * (the 审查 button passes every produced path; a file chip passes its own).
   * The owning turn number rides along so the tab expands only this turn's
   * rows — a path that recurs in other turns stays collapsed there.
   */
  openInSidebarTab?: (paths: readonly string[], turn?: number) => void
} & PropsLocale<typeof NS>

const unavailableChanges = async (request: FileReviewRequest): Promise<FileReviewResult> => ({
  files: request.files.map(file => ({
    path: file.path,
    state: 'unsupported',
    changed: false,
    reason: 'Host file toggle is unavailable',
  })),
})

function FileIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={css.icon}>
      <path d="M5.25 2.75h6l3.5 3.5v10a1 1 0 0 1-1 1h-8.5a1 1 0 0 1-1-1V3.75a1 1 0 0 1 1-1Z" />
      <path d="M11.25 2.75v3.5h3.5M7 10h5M7 13h5" />
    </svg>
  )
}

function ReviewIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={css.buttonIcon}>
      <path d="M4.5 3.5h8a1 1 0 0 1 1 1v3M6.5 6.5h4M6.5 9.5h2.25" />
      <path d="m10.5 13 1.5 1.5 3.5-4" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={css.closeIcon}>
      <path d="m5.5 5.5 9 9m0-9-9 9" />
    </svg>
  )
}

function SuccessIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={css.noticeIconSvg}>
      <path d="m5 10 3.25 3.25L15 6.5" />
    </svg>
  )
}

function ErrorIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={css.noticeIconSvg}>
      <circle cx="10" cy="10" r="6.5" />
      <path d="m7.5 7.5 5 5m0-5-5 5" />
    </svg>
  )
}

function ResultToast({
  notice, closeLabel, dismissLabel, fileListLabel, fileOpenLabel, openFile, onDone,
}: {
  readonly notice: ToggleNotice
  readonly closeLabel: string
  readonly dismissLabel: string
  readonly fileListLabel: string
  readonly fileOpenLabel: (path: string) => string
  readonly openFile: (path: string) => void
  readonly onDone: () => void
}) {
  useEffect(() => {
    const duration = notice.tone === 'success'
      ? SUCCESS_NOTICE_DURATION
      : ERROR_NOTICE_DURATION
    const timer = window.setTimeout(onDone, duration)
    return () => { window.clearTimeout(timer) }
  }, [notice.tone, onDone])
  return (
    <div
      className={`${css.toast} ${notice.tone === 'success' ? css.toastSuccess : css.toastError}`}
      role="alert"
    >
      <div className={css.toastHeader}>
        <span className={css.noticeIcon}>
          {notice.tone === 'success' ? <SuccessIcon /> : <ErrorIcon />}
        </span>
        <div className={css.toastCopy}>
          <strong className={css.toastTitle}>{notice.title}</strong>
          {notice.description !== undefined && (
            <span className={css.toastDescription}>{notice.description}</span>
          )}
        </div>
        <button
          type="button"
          className={css.toastCloseButton}
          aria-label={closeLabel}
          onClick={onDone}
        >
          <CloseIcon />
        </button>
      </div>
      {notice.files.length > 0 && (
        <div className={css.noticeFiles}>
          <span className={css.noticeFileListLabel}>{fileListLabel}</span>
          <ul className={css.noticeFileList}>
            {notice.files.map(file => (
              <li key={file.path}>
                <button
                  type="button"
                  className={css.noticeFileButton}
                  aria-label={fileOpenLabel(file.path)}
                  onClick={() => { openFile(file.path) }}
                >
                  <span className={css.noticeFilePath}>{basename(file.path)}</span>
                  <span className={css.noticeFileArrow} aria-hidden="true">↗</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {notice.tone === 'error' && (
        <button type="button" className={css.noticeDismissButton} onClick={onDone}>
          {dismissLabel}
        </button>
      )}
    </div>
  )
}

function addStats(left: UnifiedDiffStats, right: UnifiedDiffStats): UnifiedDiffStats {
  return { added: left.added + right.added, removed: left.removed + right.removed }
}

function Stats({ stats, label }: { readonly stats: UnifiedDiffStats; readonly label: string }) {
  return (
    <span className={css.stats} aria-label={label}>
      <span className={css.added}>+{stats.added}</span>
      <span className={css.removed}>-{stats.removed}</span>
    </span>
  )
}

/** Render one turn's produced files as a summary card opening the sidebar tab. */
export function ProducedFiles({
  matched: reviews, openFile, turn: turnLocation,
  inspectChanges = unavailableChanges, applyChanges = unavailableChanges,
  openInSidebarTab, t,
}: ProducedFilesProps) {
  // The owning turn number (TurnLocation.turn) rides every deep link so the
  // sidebar tab expands this turn's rows only.
  const turnNumber = turnLocation.turn
  const [toggleAction, setToggleAction] = useState<FileReviewAction>('undo')
  const [statusPending, setStatusPending] = useState(true)
  const [togglePending, setTogglePending] = useState(false)
  const [toast, setToast] = useState<ToggleNotice | null>(null)
  const toastSeqRef = useRef(0)

  const reviewsWithStats = useMemo(() => reviews.map(review => ({
    review,
    stats: summarizeDiffs(review.diffs),
  })), [reviews])
  const totalStats = useMemo(
    () => reviewsWithStats.reduce<UnifiedDiffStats>(
      (total, item) => addStats(total, item.stats),
      { added: 0, removed: 0 },
    ),
    [reviewsWithStats],
  )
  // Deleted paths carry no hunks and cannot be inspected or toggled; they are
  // display vocabulary on the chips only.
  const toggleFiles = useMemo(() => reviews
    .filter(review => review.deleted !== true)
    .map(review => ({ path: review.path, diffs: review.diffs })), [reviews])
  const reversiblePaths = useMemo(() => new Set(reviews.filter(review =>
    review.diffs.length > 0 && review.diffs.every(diff =>
      diff.path === review.path
      && diff.oldText !== null
      && diff.oldText !== diff.newText
      && (diff.oldText !== '' || diff.oldStart !== undefined)
      && (diff.newText !== '' || diff.newStart !== undefined))).map(review => review.path)), [reviews])
  const hasReversibleFiles = reversiblePaths.size > 0
  const shown = reviewsWithStats.slice(0, SHOWN_LIMIT)
  const hidden = reviewsWithStats.length - shown.length
  const allPaths = useMemo(() => reviews.map(review => review.path), [reviews])
  // A turn that only deleted files reads as a deletion summary, not an edit.
  const allDeleted = reviews.length > 0 && reviews.every(review => review.deleted === true)
  const statsMatter = totalStats.added > 0 || totalStats.removed > 0

  const showToast = useCallback((notice: Omit<ToggleNotice, 'seq'>) => {
    toastSeqRef.current += 1
    setToast({ seq: toastSeqRef.current, ...notice })
  }, [])

  const phaseForResult = useCallback((
    result: FileReviewResult,
    currentAction: FileReviewAction,
  ): FileReviewAction => {
    if (reversiblePaths.size === 0) return 'undo'
    const byPath = new Map(result.files.map(file => [file.path, file]))
    const target = currentAction === 'undo' ? 'undone' : 'applied'
    return [...reversiblePaths].every(path => byPath.get(path)?.state === target)
      ? (currentAction === 'undo' ? 'redo' : 'undo')
      : currentAction
  }, [reversiblePaths])

  useEffect(() => {
    let active = true
    setStatusPending(true)
    void inspectChanges({ action: 'undo', files: toggleFiles }).then((result) => {
      if (!active) return
      const allUndone = reversiblePaths.size > 0
        && [...reversiblePaths].every(path =>
          result.files.find(file => file.path === path)?.state === 'undone')
      setToggleAction(allUndone ? 'redo' : 'undo')
    }).catch(() => {
      // The action remains usable after a transient inspection failure; execution
      // performs the same Host-side checks again.
    }).finally(() => {
      if (active) setStatusPending(false)
    })
    return () => { active = false }
  }, [inspectChanges, reversiblePaths, toggleFiles])

  const runToggle = useCallback(() => {
    if (statusPending || togglePending || !hasReversibleFiles) return
    const action = toggleAction
    setTogglePending(true)
    void applyChanges({ action, files: toggleFiles }).then((result) => {
      setToggleAction(phaseForResult(result, action))
      const targetState = action === 'undo' ? 'undone' : 'applied'
      const byPath = new Map(result.files.map(file => [file.path, file]))
      const failures: NoticeFile[] = toggleFiles.flatMap((file) => {
        const outcome = byPath.get(file.path)
        if (outcome?.state === targetState) return []
        return [{ path: file.path }]
      })
      if (failures.length === 0) {
        showToast({
          tone: 'success',
          title: t(action === 'undo' ? 'produced.undoSuccess' : 'produced.redoSuccess'),
          files: [],
        })
        return
      }
      showToast({
        tone: 'error',
        title: t(action === 'undo' ? 'produced.undoPartial' : 'produced.redoPartial'),
        description: t(action === 'undo'
          ? 'produced.undoPartialDescription'
          : 'produced.redoPartialDescription'),
        files: failures,
      })
    }).catch((error: unknown) => {
      showToast({
        tone: 'error',
        title: t(action === 'undo' ? 'produced.undoError' : 'produced.redoError'),
        description: error instanceof Error ? error.message : String(error),
        files: [],
      })
    }).finally(() => { setTogglePending(false) })
  }, [
    applyChanges, hasReversibleFiles, phaseForResult, showToast, t,
    statusPending, toggleAction, toggleFiles, togglePending,
  ])

  return (
    <>
      <section className={css.card} aria-label={t('produced.summary')}>
        <header className={css.cardHeader}>
          <span className={css.fileIconWrap}><FileIcon /></span>
          <div className={css.cardTitleBlock}>
            <span className={css.cardTitle}>
              {allDeleted
                ? (reviews.length === 1
                  ? t('produced.deletedOne')
                  : t('produced.deletedAll', { count: String(reviews.length) }))
                : reviews.length === 1
                  ? t('produced.editedOne')
                  : t('produced.edited', { count: String(reviews.length) })}
            </span>
            {statsMatter && (
              <Stats
                stats={totalStats}
                label={t('review.stats', {
                  added: String(totalStats.added), removed: String(totalStats.removed),
                })}
              />
            )}
          </div>
          <button
            type="button"
            className={css.toggleButton}
            disabled={statusPending || togglePending || !hasReversibleFiles}
            title={!hasReversibleFiles ? t('produced.toggleUnavailable') : undefined}
            aria-label={toggleAction === 'undo' ? t('produced.undo') : t('produced.redo')}
            onClick={runToggle}
          >
            {togglePending
              ? (toggleAction === 'undo' ? t('produced.undoing') : t('produced.redoing'))
              : (toggleAction === 'undo' ? t('produced.undo') : t('produced.redo'))}
          </button>
          <button
            type="button"
            className={css.reviewButton}
            aria-label={t('produced.reviewAll')}
            onClick={() => { openInSidebarTab?.(allPaths, turnNumber) }}
          >
            <ReviewIcon />
            {t('review.title')}
          </button>
        </header>
        <div className={css.fileList}>
          {shown.map(({ review, stats }) => (
            <button
              key={review.path}
              type="button"
              className={css.fileRow}
              title={review.path}
              aria-label={t('produced.review', { name: review.path })}
              onClick={() => { openInSidebarTab?.([review.path], turnNumber) }}
            >
              <span className={css.fileName}>{basename(review.path)}</span>
              {review.deleted === true
                ? <span className={css.deletedBadge}>{t('produced.deleted')}</span>
                : (
                  <Stats
                    stats={stats}
                    label={t('review.stats', {
                      added: String(stats.added), removed: String(stats.removed),
                    })}
                  />
                )}
            </button>
          ))}
          {hidden > 0 && (
            <div className={css.moreFiles}>
              {hidden === 1
                ? t('produced.moreOne')
                : t('produced.more', { count: String(hidden) })}
            </div>
          )}
        </div>
      </section>

      {toast !== null && (
        <ResultToast
          key={toast.seq}
          notice={toast}
          closeLabel={t('produced.noticeClose')}
          dismissLabel={t('produced.noticeDismiss')}
          fileListLabel={t('produced.skippedFiles', { count: String(toast.files.length) })}
          fileOpenLabel={path => t('produced.open', { name: basename(path) })}
          openFile={openFile}
          onDone={() => { setToast(current => current?.seq === toast.seq ? null : current) }}
        />
      )}
    </>
  )
}
