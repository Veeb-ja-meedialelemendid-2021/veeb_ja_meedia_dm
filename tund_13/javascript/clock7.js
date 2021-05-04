let sound_url = "../../../../media/sounds/kellaheli/";
let clock_speaker = new Audio();
let time_words = [];
let bell = new Audio();
let prev_hour;

function init_clock(){
	document.getElementById("clock_speak_btn").addEventListener("click", tell_time);
	bell.src = sound_url + "kell.mp3";
	prev_hour = new Date().getHours();
	clockTick();
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
	//kas lüüa kella?
	//kavalam on kontrollida, kas document.getElementById("allow_bell_btn").checked ja tundide arv erineb eelmise tsükli tundidest
	//ehk currenthour != prev_hour
	//if(currentminute == 0 && currentsecond == 0 && currenttime.getMilliseconds() < 1000/60 && document.getElementById("allow_bell_btn").checked){
		//loendur, mitu korda vaja lüüa
	//}
	//setTimeout(1000,clockTick);
	requestAnimationFrame(clockTick);
}

function tell_time(){
	time_words.push("kellon");
	let currenttime = new Date();
	num_to_words(currenttime.getHours());
	time_words.push("ja");
	num_to_words(currenttime.getMinutes());
	if(currenttime.getMinutes() == 1){
		time_words.push("minut");
	} else {
		time_words.push("minutit");
	}
	//console.log(time_words);
	document.getElementById("clock_speak_btn").removeEventListener("click", tell_time);
	document.getElementById("clock_speak_btn").disabled = true;
	clock_speaker.addEventListener("ended", speak_time);
	speak_time();
}

function speak_time(){
	if(time_words.length > 0){
		clock_speaker.src = sound_url + time_words[0] + ".mp3";
		clock_speaker.play();
		time_words.shift();
	} else {
		clock_speaker.removeEventListener("ended", speak_time);
		document.getElementById("clock_speak_btn").disabled = false;
		document.getElementById("clock_speak_btn").addEventListener("click", tell_time);
	}
}

function num_to_words(num_value){
	if(num_value <= 10){
		time_words.push(num_value);
	} else {
		let tens = Math.floor(num_value / 10);
		let ones = num_value % 10;
		if(tens == 1){
			time_words.push(ones);
			time_words.push("teist");
		} else {
			time_words.push(tens);
			time_words.push("kymmend");
			if(ones > 0){
				time_words.push(ones);
			}
		}
	}
}