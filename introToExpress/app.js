var express = require ("express");
var app = express();
console.log(app);

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/",function(req, res){
	res.render("home");
});

app.get("/love/:things", function(req, res){
	var thing = req.params.things;
	res.render("love",{thingvar: thing});
});

app.get("/posts",function(req, res){
	var posts = [
		{name:"jatin", class:"k19Am"},
		{name:"pranil", class:"k19Am"},
		{name:"chandan", class:"k19Am"}
		 
	];
	res.render("posts",{posts: posts});
});

app.listen(3000,function(){
	console.log("server has started");
});
