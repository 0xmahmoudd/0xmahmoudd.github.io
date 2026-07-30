const fs = require('fs');
const path = require('path');

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const files = getAllFiles('./src');
console.log('Checking ' + files.length + ' files...');
let missingCount = 0;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const regex = /import\s+\{([^}]+)\}\s+from\s+['"]react-icons\/([a-zA-Z0-9]+)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const names = match[1].split(',').map(s => s.trim().split(/\s+as\s+/)[0]).filter(Boolean);
    const libName = match[2];
    const pkgName = 'react-icons/' + libName;
    try {
      const mod = require(pkgName);
      names.forEach(n => {
        if (!mod[n]) {
          console.error(`MISSING ICON in ${f}: "${n}" from ${pkgName}`);
          missingCount++;
        }
      });
    } catch(e) {
      console.error(`Error loading ${pkgName}: ${e.message}`);
    }
  }
});

if (missingCount === 0) {
  console.log('ALL REACT-ICONS IMPORTS ARE VALID!');
}
