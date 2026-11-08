// every file is module so we are incharge of what we are sharing
//local
const secret = "SUPER SECRET";
//share
const john = "John";
const peter= "Peter";
//exporting object
module.exports = { john, peter };
// sayHi("Alice")
// sayHi("Bob")
// sayHi("john")