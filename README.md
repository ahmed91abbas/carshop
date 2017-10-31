"# carshop" 

IT-case for Lunicore

A simple Node webserver API with four endpoints:
1. GET /employees
2. GET /carmodels
3. POST /carmodels
4. GET /total_sales

To run the server simply run the command $node carshopserver.js
The server will start listening at http://localhost:1212

This repository include all the Node modules needed for the server to run.

Ex.GET:
$curl http://localhost:1212/carmodels
Ex.POST:
$curl -H "Content-Type: application/json" -X POST -d '{"brand":"car","model":"new", "price":100}' http://localhost:1212/carmodels

