// scope-98.js
import fs from 'fs';
import path from 'path';

const cssPath = path.resolve('node_modules/98.css/dist/98.css');
let css = fs.readFileSync(cssPath, 'utf-8');

// strip out existing sourceMappingURL comment
css = css.replace(/\/\*#\s*sourceMappingURL=.*?\*\//g, '');

// strip all remaining CSS comments (including file header comment)
// so the scoping regex below never mistakes a comment for part of a selector
css = css.replace(/\/\*[\s\S]*?\*\//g, '');
css = css.replace(/@media\s*\(not\(hover\)\)/g, '@media not (hover)');

const scoped = css.replace(
  /(^|\})\s*([^{}]+)\s*\{/g,
  (match, brace, selector) => {
    if (selector.trim().startsWith('@')) return match;

    const prefixed = selector
      .split(',')
      .map(s => `.win98-scope ${s.trim()}`)
      .join(', ');

    return `${brace} ${prefixed} {`;
  }
);

fs.writeFileSync('98-scoped.css', scoped);
console.log('Successfully created src/98-scoped.css!');
