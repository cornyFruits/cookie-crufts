// scope-98.js
import fs from 'fs';
import path from 'path';

const cssPath = path.resolve('node_modules/98.css/dist/98.css');
let css = fs.readFileSync(cssPath, 'utf-8');

// strip out existing sourceMappingURL comment - weird Vite thing, had to fix
css = css.replace(/\/\*#\s*sourceMappingURL=.*?\*\//g, '');

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

if (!fs.existsSync('src')) {
  fs.mkdirSync('src', { recursive: true });
}

fs.writeFileSync('src/98-scoped.css', scoped);
console.log('Successfully created src/98-scoped.css!');
