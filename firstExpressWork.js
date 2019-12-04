var express = require("express");
var app = express();

app.get("/",function(req, res){
	res.send("hey there, welcome to my assignement !!");
});

app.get("/bye",function(req, res){
	res.send("good bye");
});

app.get("/dogs",function(req, res){
	console.log("someone has made a request");
	res.send("meow!!");
});

app.get("/speak/cow", function(req, res){
	res.send("the cow say 'moo' ");
});

app.get("/repeat/:name/:num",function(req, res){
	var name =  req.params.name;
	var num = Number(req.params.num);
	var result = "";
	for(var i=0;i<num;i++){
	result += name + " ";
	}
	res.send(result);
});

app.get("*",function(req, res){
	res.send("you are a star");
});

app.listen(3000, function(req, res){
	console.log("server has stared");
});
