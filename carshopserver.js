
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var fs = require('fs');
var app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//load the data file
app.locals.data = require("./data.json");

app.get('/', function (req, res) {
	res.render("index");
});

app.get('/employees', function (req, res) {
	res.charset = "UTF-8";
	res.render("employees");
});

app.get('/carmodels', function (req, res) {
	res.render("carmodels");
});

//adds the new car model to the data file and saves it
app.post("/carmodels", function(req, res){
	var brand = req.body.brand;
	var model = req.body.model;
	var price = req.body.price;
	app.locals.data.carshop.carmodels.push({
		"id": app.locals.data.carshop.carmodels.length + 1,
		"brand": brand,
		"model": model,
		"price": parseInt(price)
	});
	fs.writeFile("data.json", JSON.stringify(app.locals.data, null, 2), "utf8");
	res.redirect("/carmodels");
});

app.get('/totalsales', function (req, res) {
	res.render("totalsales");
});

app.listen(1212, function() {
	var host = "localhost:";
	var port = 1212;
	console.log("Server listening at http://%s%s", host, port);
});