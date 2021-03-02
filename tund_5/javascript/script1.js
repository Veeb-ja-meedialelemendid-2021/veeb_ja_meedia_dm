let message = "Töötab!";//varem oli var
let picurl = "../../../../media/photos/TLU_600x400/";
let picnameprefix = "tlu_";
let picext = ".jpg";
let minpicnum = 1;
let maxpicnum = 43;

window.onload = function(){
	//alert(message);
	console.log("Sõnum on: " + message);
	putOpenTime();
	putRandomPic();
	clockTick();
	//setInterval(300,clockTick);
}

function putOpenTime(){
	let currenttime = new Date();
	let currenthour = currenttime.getHours();
	let currentminute = currenttime.getMinutes();
	let currentsecond = currenttime.getSeconds();
	document.getElementById("open_message").innerHTML = "Leht avati kell " + currenthour + ":" + currentminute + ":" + currentsecond + ".";
}

function putRandomPic(){
	let randomnum = minpicnum + Math.round(Math.random() * (maxpicnum - minpicnum));
	document.getElementById("tlu_pic").src = picurl + picnameprefix + randomnum + picext;
}

function clockTick(){
	let currenttime = new Date();
	let currenthour = currenttime.getHours();
	let currentminute = currenttime.getMinutes();
	let currentsecond = currenttime.getSeconds();
	let secangle = currentsecond * 6;
	document.getElementById("secondhand").style.transform = "rotate(" + secangle + "deg)";
	//setTimeout(1000,clockTick);
	requestAnimationFrame(clockTick);
}