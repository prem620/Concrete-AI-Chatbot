/**
 * Converts basic markdown-like syntax to HTML for display in chat bubbles.
 * Handles: **bold**, `code`, ## headers, - lists, numbered lists, line breaks
 */
export function formatMessage(text: string): string {
  let html = text
    // Escape HTML first
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')

    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')

    // Unordered lists
    .replace(/^[-*] (.+)$/gm, '<li>$1</li>')
    
    // Numbered lists  
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')

  // Wrap consecutive <li> in <ul>
  html = html.replace(/(<li>.*<\/li>\n?)+/gs, (match) => `<ul>${match}</ul>`)

  // Paragraphs — split by double newlines
  const lines = html.split('\n')
  const result: string[] = []
  let buffer: string[] = []

  for (const line of lines) {
    if (line.trim() === '') {
      if (buffer.length > 0) {
        const joined = buffer.join(' ')
        if (!joined.startsWith('<ul>') && !joined.startsWith('<h3>')) {
          result.push(`<p>${joined}</p>`)
        } else {
          result.push(joined)
        }
        buffer = []
      }
    } else {
      buffer.push(line)
    }
  }

  if (buffer.length > 0) {
    const joined = buffer.join(' ')
    if (!joined.startsWith('<ul>') && !joined.startsWith('<h3>')) {
      result.push(`<p>${joined}</p>`)
    } else {
      result.push(joined)
    }
  }

  return result.join('\n')
}
