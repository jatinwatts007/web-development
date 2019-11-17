var express = require("express");
var app = express();
var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});

app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("home");
});

app.get("/about",function(req,res){
	res.render("about");
});

var PORT = process.env.PORT || 3000;

app.listen(PORT,function(){
	console.log("Deploying Demo");
});
heroku create - link created for website
git function{
  git add
  git commit -m
}
git push heroku master - To push all your codiing work into the link   
