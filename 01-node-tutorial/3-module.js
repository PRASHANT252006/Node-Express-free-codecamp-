//CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)
const  sayHi  = require("./5-utils.js");
const { john, peter } = require("./4-names.js");
const data = require("./6-alternate-flavour.js");
require("./7-mind-grenade.js");
// console.log(data);
sayHi(john);
sayHi(peter);