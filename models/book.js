// grab the things we need
var mongoose = require('mongoose');
var idexists = require('mongoose-idexists'); 
var Schema = mongoose.Schema;

// create a schema
var bookSchema = new Schema({
  title:         { type: String, required: true },
  authors:       { type: [String] },
  isbn:          { type: String, index: true, unique: true },
  courses:       { type: [String] },
  amazon:        { type: Number, min: 0, default: 0 },
  uwbook:        { type: Number, min: 0, default: 0 },
  feds:          { type: Number, min: 0, default: 0 },
  creator:       { type: Schema.Types.ObjectId, ref: 'User' },
  dateAdded:	 { type: Date, default: Date.now, required: true },
  thumbnail:     { type: String }
});

bookSchema.statics.findByTitle = function(input) {
	return this.find({ title: new RegExp(input, "i")}).lean().exec();
};

bookSchema.statics.findByISBN = function(input) {
    return this.findOne({ isbn: input }).lean().exec();
};

bookSchema.statics.findByCourse = function(input) {
    return this.find({ courses: { $in : [new RegExp(input, "i")] }}).lean().exec();
};

// Ensure foreign key integrity.
idexists.forPath(bookSchema.path("creator"), {
    message: "Creator does not exist."
});

// the schema is useless so far
// we need to create a model using it
var Book = mongoose.model('Book', bookSchema);

// make this available to our users in our Node applications
module.exports = Book;