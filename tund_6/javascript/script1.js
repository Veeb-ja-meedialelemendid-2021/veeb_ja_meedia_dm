let message = "Töötab!";//varem oli var
let picurl = "../../../../media/photos/TLU_600x400/";
let picnameprefix = "tlu_";
let picext = ".jpg";
let minpicnum = 1;
let maxpicnum = 43;
let picnum = 1;
let picchange = 0;

window.onload = function(){
	//alert(message);
	console.log("Sõnum on: " + message);
	putOpenTime();
	putRandomPic();
	clockTick();
	//setInterval(300,clockTick);
	setButtons();
}

function setButtons(){
	document.getElementById("nextphoto").addEventListener("click", nextPhoto);
	document.getElementById("prevphoto").addEventListener("click", prevPhoto);
	//panen foto opacity siirde lõppu kuulama    transitionstart     transitionend
	document.getElementById("tlu_pic2").addEventListener("transitionend", enableButtons);
	document.getElementById("animBtn").addEventListener("click", toggleAnim);
	document.getElementById("stage").addEventListener("animationstart",animInfo);
	document.getElementById("stage").addEventListener("animationend",animInfo);
	document.getElementById("stage").addEventListener("animationiteration",animInfo);
}

function nextPhoto(){
	picnum ++;
	if(picnum > maxpicnum){
		picnum = minpicnum;
	}
	putPhoto();
}

function prevPhoto(){
	picnum --;
	if(picnum < minpicnum){
		picnum = maxpicnum;
	}
	putPhoto();
}

function enableButtons(){
	document.getElementById("nextphoto").disabled = false;
	document.getElementById("prevphoto").disabled = false;
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
	picnum = randomnum;
	putPhoto();
}

function putPhoto(){
	document.getElementById("nextphoto").disabled = true;
	document.getElementById("prevphoto").disabled = true;
	if(picchange%2 == 0){
		document.getElementById("tlu_pic2").src = picurl + picnameprefix + picnum + picext;
		document.getElementById("tlu_pic2").style.opacity = 1;
	} else {
		document.getElementById("tlu_pic").src = picurl + picnameprefix + picnum + picext;
		document.getElementById("tlu_pic2").style.opacity = 0;
	}
	picchange ++;
}

function clockTick(){
	let currenttime = new Date();
	let currenthour = currenttime.getHours();
	let currentminute = currenttime.getMinutes();
	let currentsecond = currenttime.getSeconds();
	let secangle = currentsecond * 6;
	let minangle = currentminute * 6 + currentsecond * .1;
	let hourangle = currenthour * 30 + currentminute * .5;
	document.getElementById("secondhand").style.transform = "rotate(" + secangle + "deg)";
	document.getElementById("minutehand").style.transform = "rotate(" + minangle + "deg)";
	document.getElementById("hourhand").style.transform = "rotate(" + hourangle + "deg)";
	//setTimeout(1000,clockTick);
	requestAnimationFrame(clockTick);
}

function toggleAnim(){
	//console.log(document.getElementById("truckarea").style.animationPlayState);
	let allitems = document.getElementById("stage").getElementsByTagName("*");
	//console.log(allitems);
	if(document.getElementById("animBtn").innerHTML == "Käivita animatsioon"){
		document.getElementById("animBtn").innerHTML = "Peata animatsioon";
		//document.getElementById("truckarea").style.animationPlayState = "running";
		for(let i = 0; i < allitems.length; i ++){
			allitems[i].style.animationPlayState = "running";
		}
	} else {
		document.getElementById("animBtn").innerHTML = "Käivita animatsioon";
		//document.getElementById("truckarea").style.animationPlayState = "paused";
		for(let i = 0; i < allitems.length; i ++){
			allitems[i].style.animationPlayState = "paused";
		}
	}
}

function animInfo(e){
	if(e.type == "animationend"){
		//console.log(e.animationName);
		//console.log(e.target.id);
		if(e.target.id == "truckarea"){
			let animdelay = 1 + Math.round(Math.random() * 5);
			let animduration = 8 + Math.round(Math.random() * 5);
			e.target.style.animationDelay = animdelay + "s";
			e.target.style.animationDuration = animduration + "s";
			if(e.animationName == "drive"){
				e.target.style.animationName = "driveback";
				
			} else {
				e.target.style.animationName = "drive";
			}
		}
	}
}