var express               = require ("express");
var app                   = express();
var mongoose              = require("mongoose");
var passport              = require("passport");
var bodyParser            = require("body-parser");
var localStratgy          = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User                  = require("./models/user")

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/Auth_Demo_App", {useNewUrlParser: true});

app.use(require("express-session")({
	secret:"Jatin Watts The Coder",
	resave: false,
	saveUninitialized: false
}));
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));
passport.use(new localStratgy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ===========
// routes
// ==========

app.get("/",function(req,res){
	res.render("home");
});

app.get("/secret",isLoggedIn,function(req,res){
	res.render("secret");
});

// auth routes
//to show sign up page
app.get("/register",function(req, res){
	res.render("register");
});

//handling of sign up page

app.post("/register",function(req,res){
	req.body.username
	req.body.password
	User.register(new User({username:req.body.username}),req.body.password,function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}else{
			passport.authenticate("local")(req, res, function(){
				res.redirect("/secret");
			});
		}
	});
});
// login routes

app.get("/login",function(req,res){
	res.render("login");
});

app.post("/login",passport.authenticate("local",{
	successRedirect:"/secret",
	failureRedirect:"/login"
}),function(req,res){
	
});

app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


app.listen(3000,function(){
	console.log("server has started......");
});
