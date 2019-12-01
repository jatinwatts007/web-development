var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
	
});

var Cat = mongoose.model("Cat",catSchema);

//var gorge = new Cat({
	//name:"katty",
	//age:12,
	//temperament:"safed"
//});

//gorge.save(function(err,cat){
//	if(err){
	//	console.log("something went wrong");
	//}else{
		//console.log("you have saved the cat");
		//console.log(cat);
	//}
//});

Cat.create({
	name:"jatin",
	age:32,
	temperament:"sexy"
},function(err, cat){
	if(err){
		console.log(err);
	}else{
		console.log(cat);
	}
});

Cat.find({},function(err, cats){
	if(err){
		console.log("hey its an err");
		console.log(err);
	}else{
		console.log("all the cats");
		console.log(cats);
	}
});
