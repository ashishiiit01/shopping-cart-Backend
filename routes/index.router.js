const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller')


router.post("/register",ctrlUser.register)
router.post("/userProfile", ctrlUser.userProfile)
router.post("/product", ctrlUser.products123)
router.post("/payPal", ctrlUser.payPal)
router.post("/creditCard", ctrlUser.creditCard);



router.get("/getProducts",ctrlUser.getProducts)
router.get("/paypalFail",ctrlUser.paypalFail)
router.get("/paypalSuccess",ctrlUser.paypalSuccess)

router.get('/product/:id',ctrlUser.getProductById)






module.exports = router; 