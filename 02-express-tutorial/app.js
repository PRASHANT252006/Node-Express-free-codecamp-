const express = require('express');
const app = express();
const  people  = require('./routes/people.js');
const auth = require('./routes/auth.js');

app.use(express.static('./method-public'))
app.use(express.urlencoded({ extended: false }))//urlencoded parses incoming payloads and is based on body-parser
//parse incoming json data
app.use(express.json())

app.use('/api/people', people)
app.use('/login', auth)

app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
})