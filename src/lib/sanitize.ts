import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitize string content to prevent XSS.
 * React escapes by default, but this is useful if we ever use dangerouslySetInnerHTML
 * or for sanitizing data before sending to certain APIs.
 */
export function sanitize(content: string): string {
    return DOMPurify.sanitize(content);
}
