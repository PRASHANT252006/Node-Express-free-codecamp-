const {readFileSync,writeFileSync} = require('fs');
//Without 'utf8', Node.js returns the file contents as a Buffer
// output: <Buffer 68 65 6c 6c 6f 20 74 68 69 73 20 69 73 20 66 69 72 73 74 20 74 65 78 74 20 66 69 6c65>

console.log("Start")//.


const first = readFileSync('./content/first.txt');
const firstu = readFileSync('./content/first.txt','utf8');
const second = readFileSync('./content/second.txt','utf8');

console.log(first);
console.log(firstu);
console.log(second);

// writeFileSync('./content/result-sync.txt',`Here is the result: ${firstu} ${second}`);
// if there is already a file with the same name, it will overwrite the file. If you want to add to the file instead of overwriting it, you can use the flag option.



writeFileSync(
    './content/result-sync.txt',
    `Here is the result: ${firstu} ${second}\n`,
    { flag: 'a' }
);
console.log("End")//.
