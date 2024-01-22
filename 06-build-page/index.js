const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

fs.mkdir('06-build-page/project-dist', (err) => {
  if (err) {
    console.log('Папка существует');
  }
  console.log('Папка project-dist успешно создана');
  fs.mkdir('06-build-page/project-dist/assets', (err) => {
    if (err) {
      console.log('Папка существует');
    }
    console.log('Папка assets успешно создана');
  });
});

fs.readdir('06-build-page/assets', (err, files) => {
  if (err) throw err;
  files.forEach((item) => {
    fs.stat(`06-build-page/assets/${item}`, (err, stats) => {
      if (err) throw err;
      if (stats.isDirectory()) {
        const extName = path.extname(item);
        const name = item.replace(extName, '');
        console.log(name);
        fs.mkdir(`06-build-page/project-dist/assets/${name}`, (err) => {
          if (err) {
            console.log('Папка существует');
          }
          console.log(`Папка ${name} успешно создана`);
        });

        fs.readdir(`06-build-page/assets/${name}`, (err, files) => {
          if (err) {
            console.log(err);
          }
          files.forEach((item) => {
            console.log(item);

            fsPromises
              .copyFile(
                `06-build-page/assets/${name}/${item}`,
                `06-build-page/project-dist/assets/${name}/${item}`,
              )
              .catch(function (error) {
                console.log(error);
              });
          });
        });
      }
    });
  });
});
