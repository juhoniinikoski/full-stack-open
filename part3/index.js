require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();

// eslint-disable-next-line
morgan.token('type', function (req, res) {
  if (req.method === 'POST' || req.method === 'PUT')
    return JSON.stringify(req.body);
});
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :type'),
);

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
];

app.get('/', (_req, res) => {
  res.send('Hello server!');
});

app.get('/api/persons', (_req, res) => {
  Person.find({}).then(persons => res.json(persons));
});

app.get('/api/seed', (_req, res) => {
  Person.deleteMany({}).then(() =>
    persons.forEach(p => {
      const newPerson = new Person({
        number: p.number,
        name: p.name,
      });

      newPerson.save();
    }),
  );

  res.send('Database seeded succesfully');
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => res.json(person))
    .catch(e => next(e));
});

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  const newPerson = new Person({
    name: name,
    number: number,
  });

  newPerson
    .save()
    .then(() => res.status(201).end())
    .catch(e => next(e));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(req.params.id, { name: name, number: number })
    .then(() => res.status(200).end())
    .catch(e => next(e));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(e => next(e));
});

app.get('/info', (_req, res) => {
  const date = new Date();
  Person.find({}).then(persons => {
    res.send(`
      <div>
        <p>Phonebook has info for ${persons.length} people<p>
        <p>${date}<p>
      </div>
    `);
  });
});

const errorHandler = (error, _request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message,
    });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
