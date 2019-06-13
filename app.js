const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const ejs = require("ejs");


const router = require('./routes/index.router')
const {initPayment, responsePayment} = require("./paytm/services/index");


var db = 'mongodb://admin1234:admin1234@ds153824.mlab.com:53824/ashish01';
mongoose.connect(db);

app.use(bodyParser.json());
app.use(cors());


app.use(express.static(__dirname + "/views"));
app.set("view engine", "ejs");


app.use('/api',router)


app.get("/paywithpaytm", (req, res) => {
	console.log(req.query)
    initPayment(req.query.amount).then(
        success => {
            console.log("success",success)
            res.render("paytmRedirect.ejs", {
                resultData: success,
                paytmFinalUrl: 'https://securegw-stage.paytm.in/theia/processTransaction'
            });
        },
        error => {
            res.send(error);
        }
    );
});

app.post("/paywithpaytmresponse", (req, res) => {
    responsePayment(req.body).then(
        success => {
            res.render("response.ejs", {resultData: "true", responseData: success});
        },
        error => {
            res.send(error);
        }
    );
});

app.listen(3000,() => {
	console.log("app is listening at 3000")
})
