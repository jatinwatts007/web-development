var express = require ("express");
var app = express();
var bodyparser = require("body-parser");
var friends = ["jatin","nikhil","mayank","kartik"];

app.use(bodyparser.urlencoded({extended: true}));

app.set("view engine","ejs");

app.get("/", function(req, res){
	res.render("home");	
});

app.post("/addfriend",function(req, res){
	var newfriend = req.body.newfriend;
	friends.push(newfriend);
	res.redirect("/friends");
});

app.get("/friends",function(req, res){
	
	res.render("friends",{friends:friends});
});

app.listen(3000,function(){
	console.log("server has started");
});
