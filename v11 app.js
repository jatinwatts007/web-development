var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require ("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var User =require("./models/user");
var methodOverride = require("method-override");
var flash = require("connect-flash");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

var campground = require("./models/campgrounds");
var comment = require("./models/comment");
var seedDB = require("./seeds");

var commentsRoutes = require("./routes/comments"),
campgroundsRoutes  = require("./routes/campgrounds"),
	authRoutes     = require("./routes/index");




// seedDB();



//PASSPORT CONFIGURATION

app.use(require("express-session")({
	secret:"Danger we are here",
	resave: false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(authRoutes);
app.use("/campgrounds",campgroundsRoutes);
app.use("/campgrounds/:id/comments",commentsRoutes);

app.listen(3000,function(){
	console.log("yelpcamp has started!!");
});