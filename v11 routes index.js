var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/",function(req, res){
	res.render("landing");
});

 
router.get("/register",function(req, res){
	res.render("register");
});

// handling sign up option
router.post("/register",function(req,res){
	console.log(req.body);
	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			 return res.render("register");
		}
			passport.authenticate("local")(req, res,function(){
				req.flash("Success","Welcome to Yelpcamp" + user.username);
				res.redirect("/campgrounds");
			});
		});
});

// login form

router.get("/login",function(req,res){
	res.render("login");
});

// handling login ligic

router.post("/login",passport.authenticate("local",
{
	successRedirect: "/campgrounds",
	failureRedirect:"/login"
	
}),function(req,res){
	
});

// logout route

router.get("/logout",function(req, res){
	req.logout();
	req.flash("success","Logged You Out");
	res.redirect("/campgrounds");
});

module.exports = router;
