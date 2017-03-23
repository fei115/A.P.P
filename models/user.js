// grab the things we need
var mongoose = require('mongoose');
var idexists = require('mongoose-idexists');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
	firstname:   { type: String, required: true},
	lastname:    { type: String, required: true},
	phone:       { type: String, maxlength: 11 },
	rating:      { type: Number, min: 0, max: 5, default: 0 },
	role:        { type: String, enum: ['Admin', 'User'], required: true, default: 'User'},
	verified:    { type: Boolean, required: true, default: false},
	interests:   [{ 
		post:		 { type: Schema.Types.ObjectId, ref: 'Post' },
		dateAdded:   { type: Date, default: Date.now }
	}],
	local:       {
		email:       { type: String },
		password:    { type: String },
		salt:        { type: String }
	},
	facebook:    {
		id:          { type: String },
		token:       { type: String },
		email:       { type: String },
	}
}); // consider adding pre-save middlewares to ensure local & facebook contains no empty field

userSchema.methods.validPassword = function( pwd ) {
    return ( this.local.password === pwd );
};

idexists.forPath(userSchema.path("interests"));

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;