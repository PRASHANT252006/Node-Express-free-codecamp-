//UTF-8 is a character encoding format that converts text characters into bytes so computers can store and read text correctly.
const path = require('path');

// 1. path.sep: Returns the OS path separator
console.log(path.sep); // Windows: \

// 2. path.join(): Joins multiple path segments
console.log(path.join('content', 'subfolder', 'test.txt'));
// Output: content\subfolder\test.txt (Windows)

// 3. path.basename(): Returns the filename from a path
console.log(path.basename('/content/subfolder/test.txt'));
// Output: test.txt

// 4. path.resolve(): Converts path segments into an absolute path
console.log(path.resolve('content', 'subfolder', 'test.txt'));
// Output: Absolute path from the current working directory

// 5. __dirname: Gives the absolute path of the current file's directory
console.log(__dirname);
//output:\Users\Dell\Desktop\Tutorail
