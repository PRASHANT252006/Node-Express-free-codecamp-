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