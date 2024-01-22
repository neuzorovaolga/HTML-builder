const fs = require('fs');
const path = require('path');

fs.readdir('05-merge-styles/styles', (err, files) => {
  if (err) throw err;
  fs.createWriteStream('05-merge-styles/project-dist/bundle.css');
  files.forEach((item) => {
    fs.stat(`05-merge-styles/styles/${item}`, (err, stats) => {
      if (err) throw err;
      if (stats.isFile() && path.extname(item) === '.css') {
        console.log(path.basename(item));
        fs.readFile(`05-merge-styles/styles/${item}`, (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          fs.appendFile(
            '05-merge-styles/project-dist/bundle.css',
            data,
            (err) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log('файл записан успешно');
            },
          );
        });
      }
    });
  });
});
