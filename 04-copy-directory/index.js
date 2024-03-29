const fs = require('fs');
const fsPromises = require('fs').promises;

fs.mkdir('04-copy-directory/files-copy', (err) => {
  if (err) {
    fs.readdir('04-copy-directory/files-copy', (err, files) => {
      files.forEach((item) => {
        fs.unlink(`04-copy-directory/files-copy/${item}`, () => {});
      });
      files.forEach((item) => {
        fsPromises
          .copyFile(
            `04-copy-directory/files/${item}`,
            `04-copy-directory/files-copy/${item}`,
          )
          .catch(() => {});
      });
    });
  }
});

fs.readdir('04-copy-directory/files', (err, files) => {
  files.forEach((item) => {
    fsPromises
      .copyFile(
        `04-copy-directory/files/${item}`,
        `04-copy-directory/files-copy/${item}`,
      )
      .catch(() => {});
  });
});
