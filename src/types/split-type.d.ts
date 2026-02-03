declare module 'split-type' {
    export default class SplitType {
        static create(target: string | HTMLElement | NodeList, options?: Record<string, unknown>): SplitType;
        lines: HTMLElement[] | null;
        words: HTMLElement[] | null;
        chars: HTMLElement[] | null;
        revert(): void;
    }
}
