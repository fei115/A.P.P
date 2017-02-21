// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var bookSchema = new Schema({
  title:         { type: String, required: true },
  authors:       { type: [String], required: true },
  isbn:          { type: String, index: true, unique: true },
  publishedDate: Date,
  publisher:     String
});

// the schema is useless so far
// we need to create a model using it
var Book = mongoose.model('Book', bookSchema);

// make this available to our users in our Node applications
module.exports = Book;