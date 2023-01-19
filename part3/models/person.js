const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((e) => {
    console.log('ERROR WHEN CONNECTION TO MongoDB:', e.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{5}/.test(v) || /\d{2}-\d{6}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: true,
    unique: true,
  },
});

personSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
