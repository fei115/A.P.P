/* grab the things we need */
var mongoose = require('mongoose');
var idexists = require('mongoose-idexists');  
var Schema = mongoose.Schema;

/* create a schema */
var ratingSchema = new Schema({
  rater:     { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  ratee:     { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  post:      { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
  value:     { type: Number, min: 0, max: 5, required: true }
});

// Ensure foreign key integrity.
idexists.forPath(ratingSchema.path("rater"));
idexists.forPath(ratingSchema.path("ratee"));
// post is omitted here because the system regularly delete the outdated posts, but rating should remain.

// the schema is useless so far
// we need to create a model using it
var Rating = mongoose.model('Rating', ratingSchema);

// make this available to our users in our Node applications
module.exports = Rating;