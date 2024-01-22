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

fs.readdir('06-build-page/styles', (err, files) => {
  if (err) throw err;
  fs.open('06-build-page/project-dist/style.css', 'w', (err) => {
    if (err) throw err;
    console.log('File created');
  });
  files.forEach((item) => {
    fs.stat(`06-build-page/styles/${item}`, (err, stats) => {
      if (err) throw err;
      if (stats.isFile() && path.extname(item) === '.css') {
        console.log(path.basename(item));
        fs.readFile(`06-build-page/styles/${item}`, (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          fs.appendFile('06-build-page/project-dist/style.css', data, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log('файл записан успешно');
          });
        });
      }
    });
  });
});

fs.open('06-build-page/project-dist/index.html', 'w', (err) => {
  if (err) throw err;
  console.log('Файл индекс создан');
});

fs.stat('06-build-page/template.html', (err, stats) => {
  if (err) throw err;
  if (stats.isFile()) {
    fs.readFile('06-build-page/template.html', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      fs.appendFile('06-build-page/project-dist/index.html', data, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('файл записан успешно BODY');
        //
        fs.readFile(
          '06-build-page/project-dist/index.html',
          'utf8',
          async (err, body) => {
            if (err) {
              console.error(err);
            }
            console.log(body.toString(), '1');
            fs.readFile(
              '06-build-page/components/header.html',
              'utf8',
              (err, header) => {
                if (err) {
                  console.error(err);
                }
                console.log(header.toString(), 'header');
                body = body.replace(/\{\{header\}\}/, header);
                fs.readFile(
                  '06-build-page/components/articles.html',
                  'utf8',
                  (err, articles) => {
                    if (err) {
                      console.error(err);
                    }
                    articles.toString();
                    body = body.replace(/\{\{articles\}\}/, articles);

                    fs.readFile(
                      '06-build-page/components/footer.html',
                      'utf8',
                      (err, footer) => {
                        if (err) {
                          console.error(err);
                        }
                        footer.toString();
                        body = body.replace(/\{\{footer\}\}/, footer);

                        fs.writeFile(
                          '06-build-page/project-dist/index.html',
                          body,
                          (error) => console.log('Done!'),
                        );
                      },
                    );
                  },
                );
              },
            );
          },
        );
      });
    });
  }
});

// fs.readFile('06-build-page/project-dist/index.html', 'utf8', (err, body) => {
//   if (err) {
//     console.error(err);
//   }
//   console.log(body.toString());
//   fs.readFile('06-build-page/components/header.html', 'utf8', (err, header) => {
//     if (err) {
//       console.error(err);
//     }
//     console.log(header.toString());
//     body = body.replace(/\{\{header\}\}/, header);
//   });
//   fs.readFile('06-build-page/components/footer.html', 'utf8', (err, footer) => {
//     if (err) {
//       console.error(err);
//     }
//     footer.toString();
//     body = body.replace(/\{\{footer\}\}/, footer);
//   });
//   fs.readFile(
//     '06-build-page/components/articles.html',
//     'utf8',
//     (err, articles) => {
//       if (err) {
//         console.error(err);
//       }
//       articles.toString();
//       body = body.replace(/\{\{articles\}\}/, articles);
//     },
//   );

//   fs.writeFile('06-build-page/project-dist/index.html', body, (error) =>
//     console.log('Done!'),
//   );
// });
