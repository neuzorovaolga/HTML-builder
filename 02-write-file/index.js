const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const writeableStream = fs.createWriteStream('02-write-file/text.txt');

function text(question) {
  rl.question(question, (answer) => {
    if (answer === 'exit') {
      process.stdout.write('Goodbye!\n');
      process.exit(1);
    }
    writeableStream.write(`${answer}\n`);
    text('Enter some text: ');
  });
}

text('Hi everybody! Enter some text: ');
