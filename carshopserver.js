
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());

app.locals.data = require("./data.json");

var todoItems = [
	{id: 1, desc: "a"},
	{id: 2, desc: "b"},
	{id: 3, desc: "c"}
];


app.get('/', function (req, res) {
	res.render("index");
});

app.get('/carmodels', function (req, res) {
	res.render("carmodels", {
		title: "dsa",
		items: todoItems
	});
});

app.post("/carmodels", function(req, res){
	var newItem = req.body.newItem;
	
	todoItems.push({
		id: todoItems.length + 1,
		desc: newItem
	});
	res.redirect("/carmodels");
});

app.listen(1337, function() {
	console.log("Listening on port 1337");
});