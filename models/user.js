// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  username:    { type: String, maxlength: 20, required: true, unique: true},
  password:    { type: String, required: true },
  salt:        { type: String, required: true },
  name:        { type: String, required: true },
  email:       { type: String, maxlength: 20, required: true },
  phone:       { type: String, maxlength: 11 },
  rating:      { type: Number, min: 0, max: 5, default: 0 },
  role:        { type: String, enum: ['Admin', 'User'], required: true }
});

userSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;