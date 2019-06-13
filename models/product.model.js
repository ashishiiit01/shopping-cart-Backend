const mongoose = require('mongoose');


var ProductSchema = new mongoose.Schema({
	name:String,
	price:Number,
	imageUrl1:String,
	imageUrl2:String

});




module.exports = mongoose.model('Product', ProductSchema);
