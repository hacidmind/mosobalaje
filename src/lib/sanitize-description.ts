import sanitizeHtml from 'sanitize-html';
import { descriptionToHtml } from './description-format';

export function sanitizeDescription(value: string): string {
  if (!value.trim()) return '';
  return sanitizeHtml(descriptionToHtml(value), {
    allowedTags: ['p', 'br', 'h2', 'h3', 'strong', 'b', 'em', 'i', 'u', 's', 'ul', 'ol', 'li', 'blockquote'],
    allowedAttributes: {},
  });
}
