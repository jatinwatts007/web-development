var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
	{name:"Himalayan hill",image:"https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},	
	{name:"Sikkim hill",image:"https://media.istockphoto.com/photos/father-and-son-camping-together-picture-id833226490?k=6&m=833226490&s=612x612&w=0&h=uPmGHe4lnc4xIt9-qoS3_ps8q4Uq-9s7bHiU3XhEtSg="},	
	{name:"Desert hill",image:"https://www.esperance.wa.gov.au/sites/default/files/admin/Seafront%20Caravan%20Park/circle_photo-01.png"}	

];

app.use(bodyParser.urlencoded({extended : true}));

app.set("view engine","ejs");

app.get("/",function(req, res){
	res.render("landing");
});

app.get("/campgrounds",function(req, res){
	
	res.render("campgrounds",{campgrounds:campgrounds});
	
});

app.get("/campgrounds/new",function(req, res){
	res.render("new");
});

app.post("/campgrounds",function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var newcampgrounds = {name:name,image:image};
	campgrounds.push(newcampgrounds);
	res.redirect("/campgrounds");
});

app.listen(3000,function(){
	console.log("yelpcamp has started!!");
});
