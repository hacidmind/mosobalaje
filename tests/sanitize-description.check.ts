import { sanitizeDescription } from '../src/lib/sanitize-description';

const sanitized = sanitizeDescription('<h2>Title</h2><script>alert(1)</script><p onclick="bad()"><strong>Safe</strong></p>');

if (sanitized !== '<h2>Title</h2><p><strong>Safe</strong></p>') {
  throw new Error(`Unexpected sanitized output: ${sanitized}`);
}

if (sanitizeDescription('   ') !== '') throw new Error('Blank descriptions must remain blank');

console.log('Sanitizer check passed');
