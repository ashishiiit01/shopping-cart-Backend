const mongoose = require('mongoose');


var PayPalSchema = new mongoose.Schema({
	userId:String,
	payerId:String,
	paymentId:String,

});




module.exports = mongoose.model('PayPalUser', PayPalSchema);
