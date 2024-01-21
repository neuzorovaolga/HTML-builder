const fs = require('fs');
const fsPromises = require('fs').promises;

fs.mkdir('04-copy-directory/files-copy', () => {});

fs.readdir('04-copy-directory/files', (err, files) => {
  if (err) throw err;
  files.forEach((item) => {
    fsPromises
      .copyFile(
        `04-copy-directory/files/${item}`,
        `04-copy-directory/files-copy/${item}`,
      )
      .catch(function (error) {
        console.log(error);
      });
  });
});
