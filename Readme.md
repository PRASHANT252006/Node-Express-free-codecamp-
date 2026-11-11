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