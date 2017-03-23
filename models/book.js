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
  creator:       { type: Schema.Types.ObjectId, ref: 'User' },
  dateAdded:	 { type: Date, default: Date.now, required: true },
  thumbnail:     { type: String }
  //publishedDate: Date,
  //publisher:     String
});

bookSchema.statics.findByTitle = function(input, cb) {
	return this.find({ title: new RegExp(input, "i")}).lean().exec(cb);
};

bookSchema.statics.findByISBN = function(input, cb) {
    return this.findOne({ isbn: input }).lean().exec(cb);
};

bookSchema.statics.findByCourse = function(input, cb) {
	console.log(input);
    return this.find({ courses: { $in : [new RegExp(input, "i")] }}).lean().exec(cb);
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