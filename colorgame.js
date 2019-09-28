 var numsquares = 6;
 var colors = [];  
 var squares = document.querySelectorAll(".square");
 var pickedcolor;
 var colordisplay = document.getElementById("colordisplay");
 var messagedisplay = document.querySelector("#message");
 var h1 = document.querySelector("h1");
 var resetbutton = document.querySelector("#reset");
 var modebuttons = document.querySelectorAll(".mode");

   init();

 function init(){
 		for(var i=0; i<modebuttons.length; i++){
 	    modebuttons[i].addEventListener("click", function(){
 		modebuttons[0].classList.remove("selected");
 		modebuttons[1].classList.remove("selected");
 		this.classList.add("selected");
		this.textContent === "easy" ? numsquares = 3: numsquares = 6;
 		reset();
 	});
 }


  for(var i=0; i< squares.length; i++){
 	squares[i].style.backgroundColor = colors[i]; 
	squares[i].addEventListener("click",function(){
		var clickedcolor = this.style.backgroundColor;
 		 	if(clickedcolor === pickedcolor){
 		 	messagedisplay.textContent = "correct";
 		 	changecolor(clickedcolor);
 		 	h1.style.backgroundColor = clickedcolor;
 		 	resetbutton.textContent = "play again"; 
 		 	}else{
 		 		this.style.backgroundColor = "#232323";
 		 		messagedisplay.textContent = "try again";
			}
 		});
 	}
 	reset();
 }


 
 function reset(){
 	colors = generaterandomcolors(numsquares);
 	pickedcolor = pickcolor();
 	colordisplay.textContent = pickedcolor;
 	resetbutton.textContent = "New colors";
 	messagedisplay.textContent= "";
 	for(var i=0; i<squares.length; i++){
 		if(colors[i]){
 			squares[i].style.display = "block";
 			squares[i].style.backgroundColor = colors[i];
 		}else{
 			squares[i].style.display="none";
 		}
 	}
 	h1.style.backgroundColor = "steelblue";
 }
   // easybtn.addEventListener("click",function(){
   //easybtn.classList.add("selected");
   //hardbtn.classList.remove("selected");
   //numsquares = 3;
   //colors = generaterandomcolors(numsquares);
 	// pickedcolor = pickcolor();
 	//colordisplay.textContent = pickedcolor;
 	//for(var i=0; i<squares.length; i++){
 		//if(colors[i]){
 			//squares[i].style.backgroundColor = colors[i];
 	//	}else{
 	//		squares[i].style.display = "none";
 	//	}
 	//}

// });
// hardbtn.addEventListener("click",function(){
// 	hardbtn.classList.add("selected");
// 	easybtn.classList.remove("selected");
// 	numsquares = 6;
// 	colors = generaterandomcolors(numsquares);
 //	pickedcolor = pickcolor();
// 	colordisplay.textContent = pickedcolor;
// 	for(var i=0; i<squares.length; i++){
// 		squares[i].style.display = "block";
// 		squares[i].style.backgroundColor = colors[i];
// 	} 
 //});

 resetbutton.addEventListener("click",function(){
 	reset();
// 	colors = generaterandomcolors(numsquares);
// 	pickedcolor = pickcolor();
// 	colordisplay.textContent = pickedcolor;
// 	this.textContent = "New colors";
// 	messagedisplay.textContent= "";
// 	for(var i=0; i<squares.length; i++){
// 		squares[i].style.backgroundColor = colors[i];
// 	}
 //	h1.style.backgroundColor = "steelblue";
    resetbutton.textContent = "new colors";
 });
 //colordisplay.textContent = pickedcolor;


 function changecolor(color){
 	for(var i=0; i<squares.length; i++){
 		squares[i].style.backgroundColor=color;
 	}
 }


function pickcolor(){
	var random = Math.floor(Math.random() * colors.length );
	return colors[random];
}


function generaterandomcolors(num){
	var arr = [];
	for( var i=0; i<num; i++){
		arr.push(randomcolor());
	} 
	return arr;
}


function randomcolor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b +")";
}
