/* grab the things we need */
var mongoose = require('mongoose');
var idexists = require('mongoose-idexists');  
var Schema = mongoose.Schema;

/* A schema for 'reporting a post' e.g spam */
var reportSchema = new Schema({
  reporter:      { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  post:          { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
  reason:        { type: String },
  dateSubmitted: { type: Date, default: Date.now, required: true }
});

// Ensure foreign key integrity.
idexists.forPath(reportSchema.path("reporter"));
idexists.forPath(reportSchema.path("post"));

// the schema is useless so far
// we need to create a model using it
var Report = mongoose.model('Report', reportSchema);

// make this available to our users in our Node applications
module.exports = Report;