let music_url = "../../../../media/sounds/Funkytown.mp3";
//let music_url = "../../../../media/sounds/Tuuletallajad.mp3";
let music_player = new Audio();

function prepare_audio(){
	music_player.addEventListener("canplay", show_info);
	music_player.addEventListener("canplaythrough", can_start);
	music_player.addEventListener("durationchange", show_info);
	music_player.src = music_url;
	document.getElementById("music_vol_btn").addEventListener("input", set_music_volume);
	document.getElementById("music_speed_btn").addEventListener("input", set_music_speed);
	//music_player.play();
}

function show_info(e){
	//console.log("Saab!");
	if(e.type == "durationchange"){
		document.getElementById("music_pos_slider").max = e.target.duration;
		music_player.addEventListener("timeupdate", show_info);
		document.getElementById("music_pos_slider").addEventListener("change", music_seek);
	}
	if(e.type == "timeupdate"){
		document.getElementById("music_pos").innerHTML = e.target.currentTime.toFixed(2);
		document.getElementById("music_pos_slider").value = e.target.currentTime.toFixed(2);
	}
}

function music_seek(e){
	music_player.currentTime = e.target.value;
}

function set_music_volume(e){
	music_player.volume = e.target.value;
}

function set_music_speed(e){
	music_player.playbackRate = e.target.value;
}

function can_start(){
	//console.log("Saab lõpuni!");
	music_player.removeEventListener("canplaythrough", can_start);
	document.getElementById("music_btn").innerHTML = "Mängi muusikat!";
	document.getElementById("music_btn").addEventListener("click", toggle_music_play);
}

function toggle_music_play(){
	if(music_player.paused){
		music_player.play();
		document.getElementById("music_btn").innerHTML = "Peata muusika!";
	} else {
		music_player.pause();
		document.getElementById("music_btn").innerHTML = "Mängi muusikat!";
	}
}