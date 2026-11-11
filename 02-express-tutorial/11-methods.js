const express = require('express');
const app = express();
let { people } = require('./data');

app.use(express.static('./method-public'))
app.use(express.urlencoded({ extended: false }))//urlencoded parses incoming payloads and is based on body-parser
//parse incoming json data
app.use(express.json())



app.post('/login', (req, res) => {
    const { name } = req.body
    if (name) {
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(400).send('Please provide a name')
})
app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people })
})

app.post('/api/people', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ success: false, msg: 'Please provide name value' })
    }
    people.push({ id: Date.now(), name })
    res.status(201).json({ success: true, person: name })
})
app.post('/api/people/postman', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ success: false, msg: 'Please provide name value' })
    }
    res.status(201).json({ success: true, data: [...people, name] })
})
app.put('/api/people/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body
    console.log(id, name)
    const person = people.find((person) => person.id === Number(id))
    if (!person) {
        return res.status(404).json({ success: false, msg: 'Person not found' })
    }
    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name
        }
        return person
    })
    // person.name = name
    res.status(200).json({ success: true, data: newPeople })
})  
app.delete('/api/people/:id', (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id))
    if (!person) {
        return res.status(404).json({ success: false, msg: `Person not found with id ${req.params.id}` })
    }   
    const newPeople = people.filter((person) => person.id !== Number(req.params.id))
    return res.status(200).json({ success: true, data: newPeople })
})
app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
})