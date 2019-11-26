var express = require("express");
var router = express.Router();
var campground = require("../models/campgrounds");
var middleware = require("../middleware");
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'yelpcamp007exports', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

var NodeGeocoder = require('node-geocoder');
 var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 var geocoder = NodeGeocoder(options);


router.get("/",function(req, res){
	if(req.query.search){
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		campground.find({name:regex},function(err, allcampgrounds){
			if(err){
				console.log(err);
			}else{
				res.render("campgrounds/index",{campgrounds: allcampgrounds,currentUser:req.user});	
			}
		});
	}else{
		campground.find({},function(err, allcampgrounds){
			if(err){
				console.log(err);
			}else{
				res.render("campgrounds/index",{campgrounds: allcampgrounds,currentUser:req.user});	
			}
		});
	}
});

router.get("/new",middleware.isLoggedIn,function(req, res){
	res.render("campgrounds/new");
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn,upload.single("image"),function(req, res){
 
	// get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  };
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      console.log(err);
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newCampground = {name: name, image: image, description: description, author:author, location: location, lat: lat, lng: lng};
	   cloudinary.uploader.upload(req.file.path, function(result) {
 			 // add cloudinary url for the image to the campground object under image property
 	 		req.body.image = result.secure_url;
 	 		// add author to campground
    		// Create a new campground and save to DB
    	campground.create(newCampground, function(err, newlyCreated){
        	if(err){
            	console.log(err);
        	} else {
            	//redirect back to campgrounds page
            	console.log(newlyCreated);
            	res.redirect("/campgrounds");
        	}
	   	});
  });
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

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    req.body.campground.lat = data[0].latitude;
    req.body.campground.lng = data[0].longitude;
    req.body.campground.location = data[0].formattedAddress;

    campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
  });
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

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
	
