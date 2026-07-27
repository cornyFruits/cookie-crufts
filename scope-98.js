// scope-98.js
import fs from 'fs';
import path from 'path';

// resolve 98.css directly from node_modules
const cssPath = path.resolve('node_modules/98.css/dist/98.css');
const css = fs.readFileSync(cssPath, 'utf-8');

const scoped = css.replace(
  /(^|\})\s*([^{}]+)\s*\{/g,
  (match, brace, selector) => {
    // skip @media, @keyframes, @font-face lines, etc.
    if (selector.trim().startsWith('@')) return match;
    
    const prefixed = selector
      .split(',')
      .map(s => `.win98-scope ${s.trim()}`)
      .join(', ');
      
    return `${brace} ${prefixed} {`;
  }
);

// write to your local source or build folder
fs.writeFileSync('98-scoped.css', scoped);