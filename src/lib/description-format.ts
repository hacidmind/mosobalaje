/** Existing plain-text descriptions remain valid alongside formatted HTML. */
export function descriptionToHtml(value: string): string {
  if (/<\/?[a-z][^>]*>/i.test(value)) return value;
  return value.split(/\r?\n/).map(line => `<p>${line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</p>`).join('');
}

/** Text only, for searching and metadata; never used to render HTML. */
export function descriptionToText(value: string): string {
  return value.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, entity: string) => ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' })[entity] || '')
    .replace(/&#(\d+);/g, (_, code: string) => {
      const point = Number(code);
      return point <= 0x10ffff ? String.fromCodePoint(point) : '';
    }).replace(/\s+/g, ' ').trim();
}
