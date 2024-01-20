const fs = require('fs');

fs.readFile('01-read-file/text.txt', function (error, data) {
  if (error) {
    return console.log(error);
  }
  console.log(data.toString());
});
