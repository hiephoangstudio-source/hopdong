const fs = require('fs');
const path = require('path');

const dir = 'c:\\AntiCode\\StudioERP-Webapp\\Build-dashboard\\Dash_Master_Portal';
const files = fs.readdirSync(dir).filter(f => f.startsWith('Mod_') && f.endsWith('_View.html'));

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Remove space-y-6 from the root div if it exists right after the module comment
  const rootDivRegex = /(<!-- =+[\s\S]*?VIEW HTML\)[\s\S]*?=+ -->\s*)<div class="space-y-6( [^"]*)?">/g;
  if (rootDivRegex.test(content)) {
    content = content.replace(rootDivRegex, '$1<div class="flex flex-col gap-6$2">');
    changed = true;
  } else {
    // try another pattern if the first comment is slightly different
    const rootDivRegex2 = /(<!-- Module: .*? -->\s*)<div class="space-y-6( [^"]*)?">/gi;
    if (rootDivRegex2.test(content)) {
      content = content.replace(rootDivRegex2, '$1<div class="flex flex-col gap-6$2">');
      changed = true;
    }
  }

  // 2. Replace the action bar class
  // It's usually under <!-- ================= ACTION BAR & FILTERS ================= -->
  // or similar. Let's find the first div after ACTION BAR
  const actionBarRegex = /(<!-- =+ ACTION BAR.* =+ -->\s*)<div class="[^"]*?(glass-card|bento-shadow)[^"]*?flex flex-wrap items-center justify-between gap-4[^"]*?">/g;
  
  const stickyClass = 'sticky -top-6 -mt-6 -mx-6 px-6 pt-6 pb-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-20 flex flex-wrap items-center justify-between gap-4 mb-6 transition-all';
  
  if (actionBarRegex.test(content)) {
    content = content.replace(actionBarRegex, `$1<div class="${stickyClass}">`);
    changed = true;
  } else {
    // check if it's already sticky
    if (!content.includes('sticky -top-6')) {
      console.log(`Warning: Could not find action bar in ${file}`);
    } else {
      // it already has sticky, but might still need space-y-6 removed
      const spaceY6Replace = content.replace(/<div class="space-y-6">/g, '<div class="flex flex-col gap-6">');
      if (spaceY6Replace !== content) {
        content = spaceY6Replace;
        changed = true;
      }
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`Updated ${file}`);
  }
});

console.log(`Finished updating ${updatedCount} files.`);
