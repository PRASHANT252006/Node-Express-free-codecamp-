const express = require('express');
const app=express();

app.get('/',(req,res)=>{
    console.log('User hit the resource');
    res.status(200).send('Home Page');
});

app.get('/about',(req,res)=>{
    console.log('User hit the resource');
    res.status(200).send('About Page');
});

app.all('/*',(req, res) => {
    res.status(404).send('<h1>resource not found</h1>')
})
app.listen(5000,()=>{
    console.log('Server is listening on port 5000...');
});

//app.get
//app.post
//app.put
//app.delete
//app.all:It handles a path for every HTTP method (GET, POST, PUT, DELETE, and so on).
//app.use
//app.listen

// '/*splat' is a named wildcard in Express 5. It matches any path, and saves the matched part under the name splat.
//It runs for any URL that did not match an earlier route.
// Parts
// / is the start of the path.
// * means “match anything”.
// splat is just a name for the matched part. Express 5 requires a name after *.