const mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
	fullName:{
		type: String,
		required: 'fullName cant be empty'
	},
	email:{
		type: String,
		required: 'email cant be empty'
	},
	password:{
		type:String,
		required: 'password is required',
		minlength: [4,'minimum 4 length is required']
	},
	saltSecret: String
})




module.exports = mongoose.model('User', UserSchema);
