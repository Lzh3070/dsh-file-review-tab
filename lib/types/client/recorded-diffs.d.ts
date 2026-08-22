import type { ProducedFileDiff } from '../change-types.ts';
/**
 * Line-level hunks for one file mutation, or a single whole-file entry when the
 * file was created (`before === null`, mirroring the write tool's null-content
 * card). Returns [] when the mutation did not change the file.
 */
export declare function diffsFromBeforeAfter(path: string, before: string | null, after: string): readonly ProducedFileDiff[];
//# sourceMappingURL=recorded-diffs.d.ts.map