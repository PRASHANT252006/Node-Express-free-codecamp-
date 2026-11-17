# Node-Express-free-codecamp-

->Two types(dependency)
dependencies: needed when the app runs, even on a live server. Example: express, mongoose. Installed with npm install express.
devDependencies: needed only while you develop. Example: nodemon. Installed with npm install nodemon --save-dev.
// to save as dev dependency
-D or --save-dev
npm i nodemon --save-dev


npm uninstall <packagename>

A thenable is any object that has a .then() method.

JavaScript’s await does not need a real Promise. If the object has .then(), await will call it and wait for the result. A Mongoose query is a thenable, so await query works.


Thenable vs Promise

A Promise is a built-in JavaScript object. It starts working as soon as you create it.
A thenable is anything with .then(). It can wait until .then() is called before it does any work. This is why a Mongoose query runs only when you await it.

A Mongoose query is a thenable: an object that has a .then() method. JavaScript’s await looks for .then() on whatever you give it. When it finds one, it calls it, and Mongoose runs the query at that moment

const query = Product.find({})
Nothing runs here. query is just an object holding your filter, sort, and other options.

const products = await query

Now await calls query.then(). Mongoose sends the query to MongoDB, waits for the reply, and gives you the array.


A Mongoose query is a thenable (it has a .then() method).
It does not run when you create it.
await calls .then() on it.
When .then() is called, Mongoose sends the query to MongoDB and gives back the result.

A Mongoose query runs when .then() is called, and await calls .then() for you.

So .then() and .exec() also run the query, not only await.

// A Mongoose query is not a result yet.
  //  It is like a plan that you can keep adding to. 
  // It only runs when you await it.

  let result= Product.find(queryObject);
  if(sort){
   const sortList=sort.split(",").join(" ");
   console.log(sortList);
   result=result.sort(sortList);
  }
  else{
    result=result.sort("createdAt");
  }


  File	             Responsibility
custom-error.js	    Creates custom errors with messages and status codes
error-handler.js	Receives errors and sends HTTP responses


It lists the options you can add to a field in a schema, grouped by data type.

String

lowercase: true/false. Always converts the value to lowercase.
uppercase: true/false. Always converts the value to uppercase.
trim: true/false. Removes spaces from the start and end.
match: a RegExp. The value must match this pattern.
enum: an array. The value must be one of the values in the array.
minLength: the value length must be at least this number.
maxLength: the value length must not be more than this number.
populate: sets default populate options.

Number

min: the value must be greater than or equal to this number.
max: the value must be less than or equal to this number.
enum: the value must be one of the numbers in the array.
populate: sets default populate options.

Date

min: the earliest allowed date.
max: the latest allowed date.

ObjectId

populate: sets default populate options.

Hashing changes a text (like a password) into a different, fixed-looking text called a hash. It works in one direction only: you can make a hash from a password, but you cannot get the password back from the hash.

A salt is a random text that is added to the password before hashing.Without salt, the same password always gives the same hash. If two users have the password secret, both get the same hash, and a hacker can see that. A hacker can also use a ready-made table of common passwords and their hashes to find the password quickly.

genSalt(10) makes a random salt. The 10 is the number of rounds. A higher number is more secure but slower. 10 is a common value.One round means one full pass of mixing the password and the salt into a scrambled result. The next round takes that result and scrambles it again. More rounds means the scrambling is repeated more times.


console.log(req.params) per node me terminal per ye show [Object: null prototype] { productid: '1' }

Think of the whole thing as one story: a URL comes in, Express reads it, and Node prints it.

1. The URL has a changing part

javascript
app.get('/api/products/:productid', (req, res) => { ... })

:productid is a placeholder. If you visit /api/products/1, the 1 fills the placeholder.

2. Express puts that part inside req.params

req is the request object. It holds everything about the request. req.params is a small object inside it:

javascript
{ productid: '1' }
key: productid
value: '1' (always a string, because URLs are text)

3. Why the console shows [Object: null prototype]

Every normal object gets some hidden built-in methods (like toString). Express makes req.params without them, so it is a “bare” object. Node prints the label to tell you this. Your data is only the part inside { }.

4. When does Node show a label?

Plain object: { id: 1 } (no label)
Class object: Product { id: 1 }
Array, Map, Set, Function: shows their type
Bare object: [Object: null prototype] { ... }

5. How to use it

javascript
const id = Number(req.params.productid)
const singleProduct = products.find((product) => product.id === id)
res.json(singleProduct)

Convert to a number, find the product, send it back as JSON.

Short summary

:productid in the URL becomes a key in req.params.
The value is a string.
The label in the console is only a display detail. You can ignore it.

What does null prototype mean?

A normal object inherits some built-in methods (like toString) from Object. An object with a null prototype does not inherit anything. It is a plain, empty-of-extras object. Node just prints this label so you know. You can use it like a normal object:


It depends on the form’s method.

POST: data goes in the body

html
<form action="/login" method="POST">

The data is sent inside the request body. It is not visible in the URL.

POST /login
Content-Type: application/x-www-form-urlencoded

name=john

In Express: req.body (needs express.urlencoded()).

GET: data goes in the URL

html
<form action="/login" method="GET">

The data is added to the URL after ?. There is no body.

GET /login?name=john

In Express: req.query.

Difference

	GET	POST
Where data goes	URL (query string)	Request body
Visible in URL	Yes	No
Read in Express	req.query	req.body
Used for	Search, filters	Login, creating data

The three values

enctype	Used for
application/x-www-form-urlencoded	Normal forms (default), sends name=john
multipart/form-data	Forms with file upload
text/plain	Rarely used