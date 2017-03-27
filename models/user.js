// grab the things we need
var mongoose = require('mongoose');
var idexists = require('mongoose-idexists');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
	firstname:   { type: String, required: true},
	lastname:    { type: String, required: true},
	phone:       { type: String, maxlength: 11 },
	role:        { type: String, enum: ['Admin', 'User'], required: true, default: 'User'},
	rating:      { type: Number, min: 0, required: true, default: 100},
	verified:    { type: Boolean, required: true, default: false},
	interests:   [{ 
		_id:         false,
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
	},
	avatar:      { type: String }
}); // consider adding pre-save middlewares to ensure local & facebook contains no empty field

// Custom methods
userSchema.methods.validPassword = function( pwd ) {
    return ( this.local.password === pwd );
};

userSchema.methods.increaseRating = function(inc) {
	this.rating += inc;
	return this.save();
};

userSchema.methods.decreaseRating = function(dec) {
	this.rating -= dec;
	if(this.rating < 0) {
		this.rating = 0;
	}
	return this.save();
};
 

// Ensure foreign key integrity
idexists.forPath(userSchema.path("interests"));

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;