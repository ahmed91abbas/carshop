
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var fs = require('fs');
var app = express();

app.use(bodyParser.json());

//load the data file
var data = require("./data.json");

app.get('/', function (req, res) {
	var welcome = "Welcome to Car shop server\n";
	var options = "This server has 4 endpoints:\n";
	var o1 = "GET /employees\n";
	var o2 = "GET /carmodels\n";
	var o3 = "POST /carmodels\n";
	var o4 = "GET /total_sales\n";
	res.send(welcome + options + o1 + o2 + o3 + o4);
});

app.get('/employees', function (req, res) {
	res.charset = "UTF-8";
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(getEmployees(), null, 2));
});

app.get('/carmodels', function (req, res) {
	res.charset = "UTF-8";
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(getCarmodels(), null, 2));
});

//adds the new car model to the data file and saves it
app.post("/carmodels", function(req, res){
	var brand = req.body.brand;
	var model = req.body.model;
	var price = req.body.price;
	data.carshop.carmodels.push({
		"id": data.carshop.carmodels.length + 1,
		"brand": brand,
		"model": model,
		"price": parseInt(price)
	});
	fs.writeFile("data.json", JSON.stringify(data, null, 2), "utf8");
	res.charset = "UTF-8";
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(getCarmodels(), null, 2));
});

app.get('/totalsales', function (req, res) {
	res.charset = "UTF-8";
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(getTotalsales(), null, 2));
});

app.listen(1212, function() {
	var host = "localhost:";
	var port = 1212;
	console.log("Server listening at http://%s%s", host, port);
});

function getEmployees() {
	var employees = JSON.parse(JSON.stringify(data.carshop.employees));
	for(var i = 0; i < employees.length; i++) {
		var employee = employees[i];
		delete employee.id;
	}
	return employees;
}

function getCarmodels() {
	var carmodels = JSON.parse(JSON.stringify(data.carshop.carmodels));
		for(var i = 0; i < carmodels.length; i++) {
			var carmodel = carmodels[i];
			delete carmodel.id;
	}
	return carmodels;
}

function getTotalsales() {
	var employees = JSON.parse(JSON.stringify(data.carshop.employees));
	var carmodels = data.carshop.carmodels;
	var sales = data.carshop.sales;
	for(var i = 0; i < employees.length; i++) {
		employees[i].sales = 0;
	}
	for(var i = 0; i < sales.length; i++) {
		var price = 0;
		var employeeID = sales[i].employee_id;
		var carmodelID = sales[i].carmodel_id;
		for(var j = 0; j < carmodels.length; j++) {
			if (carmodelID == carmodels[j].id) {
				price = carmodels[j].price;
				break;
			}
		}
		for(var j = 0; j < employees.length; j++) {
			if (employeeID == employees[j].id) {
				employees[j].sales = employees[j].sales + price;
				break;
			}
		}
	}
	for(var i = 0; i < employees.length; i++) {
		var employee = employees[i];
		delete employee.id;
	}
	return employees;
}