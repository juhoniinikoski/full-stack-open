const express = require('express')
const morgan = require('morgan')

const app = express()

morgan.token('type', function (req, res) { if (req.method === 'POST') return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))

app.use(express.json())

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/', (req, res) => {
  res.send('Hello server!')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id);
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.post('/api/persons/', (req, res) => {
  const id = Math.floor(Math.random() * 5000)
  const { name, number } = req.body
  if (!name || !number) {
    res.status(404).send({error: 'name or number is missing'})
  } else if (persons.filter(p => p.name === name).length > 0) {
    res.status(404).send({error: 'given name is already added to phonebook'})
  } else {
    const newPerson = {
      name: req.body.name,
      number: String(req.body.number),
      id: id
    }
  
    persons = [...persons, newPerson]
    res.status(201).end()
  }
  
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    res.status(204).end()
    persons = persons.filter(p => p.id !== id)
  } else {
    res.status(404).end()
  }
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`
    <div>
      <p>Phonebook has info for ${persons.length} people<p>
      <p>${date}<p>
    </div>
  `)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})