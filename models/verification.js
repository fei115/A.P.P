/* grab the things we need */
var mongoose = require('mongoose');
var idexists = require('mongoose-idexists');  
var Schema = mongoose.Schema;

/* A schema for email verification */
var verificationSchema = new Schema({
  user:      { type: Schema.Types.ObjectId, required: true, ref: 'User', unique: true},
  code:      { type: String, required: true, unique: true, index: true },
  dateAdded: { type: Date, required: true, default: Date.now }
});

// Ensure foreign key integrity.
idexists.forPath(verificationSchema.path("user"));

// the schema is useless so far
// we need to create a model using it
var Verification = mongoose.model('Verification', verificationSchema);

// make this available to our users in our Node applications
module.exports = Verification;