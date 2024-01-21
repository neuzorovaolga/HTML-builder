const fs = require('fs');
const path = require('path');

fs.readdir('03-files-in-folder/secret-folder', (err, files) => {
  if (err) throw err;
  files.forEach((item) => {
    fs.stat(`03-files-in-folder/secret-folder/${item}`, (err, stats) => {
      if (err) throw err;
      if (stats.isFile()) {
        const extName = path.extname(item);
        const name = item.replace(extName, '');
        console.log(`${name}-${extName.replace('.', '')}-${stats.size}`);
      }
    });
  });
});
