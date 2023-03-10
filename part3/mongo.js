const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2]; // eslint-disable-line
const name = process.argv[3];
const number = process.argv[4];

const url = 'mongodb://127.0.0.1:27017/full-stack-phonebook'; // switched to local mongodb instead of cloud one

mongoose.set('strictQuery', false);
mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: name,
  number: number,
});

if (name && number) {
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then(result => {
    console.log('phonebook:');
    result.forEach(person => {
      console.log(person.name + ' ' + person.number);
    });
    mongoose.connection.close();
  });
}
