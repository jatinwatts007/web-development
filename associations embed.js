var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/blog_demo", {useNewUrlParser: true});

var postSchema = new mongoose.Schema({
	title:String,
	content:String
});

var post = mongoose.model("post", postSchema);

var userSchema = new mongoose.Schema({
	email:String,
	name:String,
	posts:[postSchema]
});

var user = mongoose.model("user", userSchema)

//var newuser = new user({
//	email:"mayankwatts007@gmail.com",
//	name:"mayank watts"
//});

//newuser.posts.push({
//	title:"my name is mayank",
//	content:"mdocs placed"
//});

//newuser.save(function(err, user){
//	if(err){
//		console.log(err);
//	}else{
//		console.log(user)
//	}
//});

//var newpost = new post({
//	title:"shinning apple",
//	content:"delecious apple"
//});

//newpost.save(function(err, post){
//	if(err){
//		console.log(err);
//	}else{
//		console.log(post);
//	}
//});

user.findOne({name:"mayank watts"},function(err, user){
	if(err){
		//console.log(err);
	}else{
		user.posts.push({
			title:"thapar unversity",
			content:"hostel M"
		});
		user.save(function(err, user){
			if(err){
				console.log(err);
			}else{
				console.log(user)
			}
		});
	}
});
