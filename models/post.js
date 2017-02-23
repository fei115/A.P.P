/* grab the things we need */
var mongoose = require('mongoose');
var idexists = require('mongoose-idexists');  
var Schema = mongoose.Schema;

/* create a schema */
var postSchema = new Schema({
  title:       { type: String, maxlength: 20, required: true },
  description: { type: String, maxlength: 50 },
  creator:     { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  book: 	   { type: Schema.Types.ObjectId, required: true, ref: 'Book' },
  price:	   { type: Number, min: 0, required: true },
  condition:   { type: Number, min: 0, max: 100, required: true },
  image:       { type: Buffer },
  status: 	   { type: String, enum: ['Open', 'Closed', 'On hold'], required: true },
  type: 	   { type: String, enum: ['Selling', 'Buying'], required: true },
  exchanger:   { type: Schema.Types.ObjectId, ref: 'User' },
  dateCreated: { type: Date, required: true }
});

// Ensure foreign key integrity.
idexists.forPath(postSchema.path("creator"), {
    message: "Creator does not exist."
});

idexists.forPath(postSchema.path("book"));
idexists.forPath(postSchema.path("exchanger"));

// the schema is useless so far
// we need to create a model using it
var Post = mongoose.model('Post', postSchema);

// make this available to our users in our Node applications
module.exports = Post;