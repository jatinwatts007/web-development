var express = require("express");
var router = express.Router();
var campground = require("../models/campgrounds");
var middleware = require("../middleware");

router.get("/",function(req, res){
	
	campground.find({},function(err, allcampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index",{campgrounds: allcampgrounds});	
		}
	});
});

router.get("/new",middleware.isLoggedIn,function(req, res){
	res.render("campgrounds/new");
});

router.post("/",middleware.isLoggedIn,function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var price = req.body.price;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username:req.user.username
	}
	var newcampgrounds = {name:name,image:image,price:price,description:description,author:author};
	campground.create(newcampgrounds, function(err, newlycreated){
		if(err){
			console.log(err);
		}else{
			console.log(newlycreated);
			res.redirect("/");
		}
	});
});

router.get("/:id", function(req, res){
	campground.findById(req.params.id).populate("comments").exec(function(err, foundcampground){
		if(err || !foundcampground){
			req.flash("error","campground not found");
			res.redirect("back");
			console.log(err);
		}else{
			console.log(foundcampground);
			res.render("campgrounds/show",{campground: foundcampground});
		}
	});
});

// edit route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	// is user logged in
	campground.findById(req.params.id,function(err,foundCampground){
	res.render("campgrounds/edit",{campground:foundCampground});
	});
});

//update

router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	// find and update the campground
	campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
	//redirect somewhere(show page)
});

//destroy campground route
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
	campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});



module.exports = router;
