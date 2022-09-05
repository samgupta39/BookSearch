const mongoose = require("mongoose");

//schema constructor
const Schema = mongoose.Schema;

//create a new chema object
const BookSchema = new Schema({
  bookId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  authors: [{
    type: String,
    required: true
  }],
  published: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const book = mongoose.model("book", BookSchema);

module.exports = book;