var p1button = document.getElementById("p1");
var p2button = document.querySelector("#p2");
var p1display = document.querySelector("#p1display");
var p2display = document.querySelector("#p2display");
var reset = document.getElementById("p3");
var numinput = document.querySelector("input");
var winningscorediaplay = document.querySelector("p span");
var p1score = 0;
var p2score = 0;
var gameover = false;
var winningscore = 45;

p1button.addEventListerner("click",function(){
	if(!gameover){
	p1score++;
	if(p1score === winningscore){
		p1display.classList.add("winner");
		gameover = true;
	}
	p1display.textContent = p1score;	
	}
});

p2button.addEventListerner("click",function(){
	if(!gameover){
	p2score++;
	if(p2score === winningscore){
		p2display.classList.add("winner");
		gameover = true;
	}
	p2display.textContent = p2score;
	}
});

reset.addEventListerner("click",function(){
	reset1();
});

function reset1(){
	p1score = 0;
	p2score = 0;
	p1display.textContent = 0;
	p2display.textContent = 0;
	p1display.classList.remove("winner");
	p2display.classList.remove("winner");
	gameover = false;
}

numinput.addEventListerner("change",function(){
	winningscorediaplay.textContent = numinput.value;
	winningscore = number(numinput.value);
	reset1();
});
