var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/blog_demo_2", {useNewUrlParser: true});

var postSchema = new mongoose.Schema({
	title:String,
	content:String
});

var post = mongoose.model("post", postSchema);

var userSchema = new mongoose.Schema({
	email:String,
	name:String,
	posts:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"post"
		}
	]
});

var user = mongoose.model("user", userSchema)


//post.create({
//	title:"cooking 3",
//	content:"use clean products in cooking"
//},function(err,post){
//	user.findOne({name:"jatin watts"},function(err,founduser){
//		if(err){
//			console.log(err);
//		}else{
//			founduser.posts.push(post);
//			founduser.save(function(err, data){
//				if(err){
//					console.log(err);
//				}else{
//					console.log(data);
//				}
//			});
//		}
//	});
//});


user.findOne({name:"jatin watts"}).populate("posts").exec(function(err,user){
	if(err){
		console.log(err);
	}else{
		console.log(user);
	}
});

//user.create({
//	email:"jatinwatts007@gmail.com",
//	name:"jatin watts"
//});
