function printreverse(arr){
	for(var i=arr.length-1;i>=0;i--){
		console.log(arr[i]);
	}
}
printreverse([1,2,3,4]);

// this where the uniform start 

function isunform(arr){
	var first=arr[0];
	for(var i=1;i<arr.length;i++){
		if(arr[i] !== first){
			return false;
		}
	}
	return true;
}

function sumarray(arr){
	var total=0;
	arr.forEach(function(element){
		total+=element;
	});
	return total;
}

function max(arr){
	var max=arr[0];
	for(var i=1;i<arr.length;i++){
		if(arr[i]>max){
			max=arr[i];
		}
	}
	return max;
}
