const mongoose = require('mongoose');


const booksSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  published_date: { type: Date }
});

const Books = mongoose.model('Books', booksSchema);


module.exports = Books
