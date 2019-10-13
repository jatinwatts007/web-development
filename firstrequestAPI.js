var request = require('request');
request('https://jsonplaceholder.typicode.com/users/1',function(error, response, body){
	var bodys = JSON.parse(body);
	if(error){
		console.log("something went wrong");
		console.log(error);
	}else{
		if(response.statusCode == 200){
			console.log(body.name);
		}
	}
});
