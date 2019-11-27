var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");
var seeds = [
	{
		name:"cloud's rest",
		image:"https://www.familyvacationcritic.com/uploads/sites/19/2019/07/camping-tent-father-son-200x200.jpg",
		description:"nice place for family camping"
	},
	{
		name:"cloud's rest",
	    image:"https://weretherussos.com/wp-content/uploads/2017/08/Tahoe-Valley-Campground-200x200.jpg",
		description:"nice place for couple camping"
	},
	{
		name:"cloud's rest",
		image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sNp3Ay1GNnPqSGxS7w6LLlQQ9WRsZwYn7IC0jSIbiZXbOVY",
		description:"nice place for soul camping"
	}
]

 async function seedDB(){
	await Campground.deleteMany({});
	console.log("campgrounds removed");
	await Comment.deleteMany({});
	console.log("comments removed");
	for(const seed of seeds){
		var campground = await Campground.create(seed);
		console.log("campground created");
		var comment = await Comment.create({
			text:"this is a great place, i wish internet is active here",
			author:"jatin watts"
		});
		console.log("comment created");
		campground.comments.push(comment);
		campground.save();
		console.log("comment added to campground");
	}
	
}
	

module.exports = seedDB;
