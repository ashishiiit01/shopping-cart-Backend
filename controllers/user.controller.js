const User = require('../models/user.model.js')
const Product = require('../models/product.model.js')
const PayPalUser = require("../models/paypalUser.js")
const _= require('lodash')
const paypal = require('paypal-rest-sdk');
const stripe = require('stripe')("sk_test_7DqRRbv1azisJHWxAqzNSsYw00mkklNdZo")

const stripeSecretKey = "sk_test_7DqRRbv1azisJHWxAqzNSsYw00mkklNdZo";
const stripePrivateKey = "pk_test_QqvwdX9fyf4BV2drs7ciV8zA00XVvKObBy"

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'ATAJM7M_woGa99i3urBEq8LcBpG9G4jrkNR4DUTbYsc49bIdtgcwLC4rkjW5bbYsC8rKRz4XUjyq9B4z',
  'client_secret': 'EHv-5inWzeCGBY75CYM2A3q2l5TTdRHUqmxL8MK8h4TjTCZs4rdNDIUS-mNtpINV5xSyfRB1zYv-dB14'
});

exports.register = (req, res) => {
	var user = new User();
	user.fullName = req.body.fullName;
	user.email = req.body.email;
	user.password = req.body.password
	user.save((err, doc)=>{
		if(!err){
			res.send(doc)
		}
		else
			console.log(err)
	}) 
}


exports.products123 = (req, res) => {
	var product = new Product();
	product.imageUrl = req.body.imageUrl;
	product.name = req.body.name;
	product.price = req.body.price
	product.save((err, doc)=>{
		if(!err){
			console.log("hiii",doc)
			res.send(doc)
		}
		else
			console.log(err)
	})
}


module.exports.userProfile = (req, res)=> {
	console.log("email",req.body.email)
	User.findOne(
	{email:req.body.email},
	(err, user)=>{
		if(!user)
			res.status(404).json({status:404, message: 'user record not found'})
		else
			res.status(200).json({status:200, message: _.pick(user,['fullName','email'])})
	})
}

module.exports.getProducts = (req, res)=> {
	Product.find((err, product)=> {
		if(!err)
			res.send(product)
		else
			console.log("err while getting the product",err)
	})
}


module.exports.payPal = async(req, res)=> {

	console.log("paypal",req.body.product)
	let productDetails = await getEachProductById(req.body.product)
	console.log("productdetails",productDetails)
	const successUrl = `https://localhost:3000/paypalSuccess/`
	const failureUrl = `https://localhost:3000/paypalFail`
	const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url":"https://localhost:3000/paypalSuccess",
        "cancel_url": failureUrl
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "item",
                "sku": "001",
                "price": "1.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "1.00"
        },
        "description": "This is the payment description."
    }]
};


paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
      
        		console.log(payment)
        	
        res.send(payment)
    }
});
}

module.exports.paypalSuccess = async (req, res)=> {

	const payerId = req.query.PayerID
	const paymentId = req.query.paymentId
	// let paypalUpdatedUser = req.params.productId
	// let productDetails =await  getEachProductById(req.body.productId)
	// var paypalUpdateUser = new PayPalUser();
	// paypalUpdateUser.userId = req.body.productId;
	// paypalUpdateUser.payerId = payerId;
	// paypalUpdateUser.paymentId = paymentId;
	paypalUpdateUser.save((err, doc)=>{
		if(!err){
			console.log("hiii",doc)
			res.send(doc)
		}
		else
			console.log(err)
	})
	console.log("productDetails in paypal success",productDetails)

	var execute_payment_json = {
	    "payer_id": payerId,
	    "transactions": [{
	        "amount": {
	            "currency": "USD",
	            "total": "1.00"
	        }
	    }]
	};

	paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log("Get Payment Response");
        console.log(JSON.stringify(payment));
    }
});


}

module.exports.paypalFail = (req, res)=> {
	res.send("Your Payment is failed.Sorry for the Inconvenience")
}


module.exports.creditCard = (req, res)=> {
	  const amount = 2500;

	console.log("12345",req.body)
	stripe.customers.create({
    email: "sakjhdsahkjshdahsa@gmail.com",
    source: req.body.stripeTokenId
  })
  .then(customer => stripe.charges.create({
    amount,
    description: 'Web Development Ebook',
    currency: 'usd',
    customer: customer.id
  })).catch(function() {
		console.log('charge Fail')
		res.status(500).end()
	})
}



// getProductById

 module.exports.getProductById = async (req, res)=>{ 

	try{
         const {id} = req.params;
         const result = await Product.findOne({"_id":id})
         res.json(result)

	}catch(error){
		res.json(error)
	}
//getEachProductByIdById


}

 var getEachProductById = async (productId)=>{ 

	
         const id = productId;
         const result = await Product.findOne({"_id":id})
         return result
	


}

