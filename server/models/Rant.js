const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const rantSchema = new Schema({
  rantText: {
    type: String,
    required: 'You need to leave a thought!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  rantAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  // added company, for users to input the company they worked at -jess
  company: {
    type: String,
    required: 'Must put a company name!',
    trim: true,
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Rant = model('Rant', rantSchema);

module.exports = Rant;
