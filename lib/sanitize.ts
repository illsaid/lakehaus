import sanitizeHtmlLib from 'sanitize-html';

const allowedTags = [
  'p', 'br', 'hr',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'strong', 'em', 'b', 'i', 'u', 's', 'mark',
  'ul', 'ol', 'li',
  'blockquote', 'pre', 'code',
  'a',
  'img',
  'figure', 'figcaption',
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption',
  'div', 'span',
  'sup', 'sub',
];

const allowedAttributes: sanitizeHtmlLib.IOptions['allowedAttributes'] = {
  'a': ['href', 'title', 'target', 'rel', 'class', 'id'],
  'img': ['src', 'alt', 'width', 'height', 'loading', 'class', 'id'],
  'th': ['colspan', 'rowspan', 'scope', 'class'],
  'td': ['colspan', 'rowspan', 'class'],
  'table': ['class'],
  '*': ['class', 'id'],
};

export function sanitizeHtml(dirty: string | null | undefined): string {
  if (!dirty) return '';

  return sanitizeHtmlLib(dirty, {
    allowedTags,
    allowedAttributes,
    transformTags: {
      'a': (tagName, attribs) => {
        const href = attribs.href || '';
        const isExternal =
          href.startsWith('http://') ||
          href.startsWith('https://') ||
          href.startsWith('//');

        return {
          tagName,
          attribs: {
            ...attribs,
            ...(isExternal
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {}),
          },
        };
      },
    },
  });
}
