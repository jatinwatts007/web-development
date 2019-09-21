var movies=[
	{
		title:"in bruges",
		haswatched: true,
		rating:5
	},
	{
		title:"frozan",
		haswatched: false,
		rating:4.5
	}
]
movies.forEach(function(movie){
	var result= "you have ";
	if(movie.haswatched){
		result+="watched";
	}else{
		result+="not seen";
	}
	result +="\"" + movie.title + "\""+ " - ";
	result+=movie.rating + "stars"
	console.log(result)
});
