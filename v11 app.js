require('dotenv').config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require ("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var User =require("./models/user");
var methodOverride = require("method-override");
var flash = require("connect-flash");
app.locals.moment = require('moment');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var url = process.env.DATABASEURL || "mongodb://localhost:27017/yelp_camp";
mongoose.connect(url, {useNewUrlParser: true});
// mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
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

app.use( async function(req,res,next){
	res.locals.currentUser = req.user;
	if(req.user) {
    try {
      let user = await User.findById(req.user._id).populate('notifications', null, { isRead: false }).exec();
      res.locals.notifications = user.notifications.reverse();
    } catch(err) {
      console.log(err.message);
    }
   }
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(authRoutes);
app.use("/campgrounds",campgroundsRoutes);
app.use("/campgrounds/:id/comments",commentsRoutes);

var PORT = process.env.PORT || 3000;

app.listen(PORT,function(){
	console.log("yelpcamp has started!!");
});

