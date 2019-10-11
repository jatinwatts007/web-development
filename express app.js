var express = require("express");
var app = express();

app.get("/",function(req, res){
	res.send("hey there !!");
});

app.get("/bye",function(req, res){
	res.send("good bye");
});

app.get("/dogs",function(req, res){
	console.log("someone has made a request");
	res.send("meow!!");
});

app.get("/r/:subredditName", function(req, res){
	var subreddit = req.params.subredditName;
	res.send("welcome to the " + subreddit.toUpperCase() +" subreddit");
});

app.get("/r/:subreddit/comments/:id/:tittle",function(req,res){
	res.send("welcome to new comments you posted");
});

app.get("*",function(req, res){
	res.send("you are a star");
});

app.listen(3000, function(req, res){
	console.log("server has stared");
})
