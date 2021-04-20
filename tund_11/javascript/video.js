let movie;
let title_mode = "hidden";//disabled   hidden  showing
let movie_title;
let title_num;

window.onload = function(){
	movie = document.getElementById("movie");
	console.log(movie.textTracks);
	movie.textTracks[0].mode = title_mode;
	title_num = 0;
	movie_title = movie.textTracks[0];
	document.getElementById("subtitle_btn").addEventListener("click", set_title);
	movie_title.addEventListener("cuechange", display_titles);
	document.getElementById("brightness_btn").addEventListener("input", set_filter);
	document.getElementById("contrast_btn").addEventListener("input", set_filter);
	document.getElementById("saturation_btn").addEventListener("input", set_filter);
	document.getElementById("blur_btn").addEventListener("input", set_filter);
}

function set_filter(){
	let filter = "";
	filter += "brightness(" + document.getElementById("brightness_btn").value + "%)";  //brighness(100%)
	filter += " contrast(" + document.getElementById("contrast_btn").value + "%)";  //contrast(100%)
	filter += " saturate(" + document.getElementById("saturation_btn").value + "%)";  //saturate(100%)
	filter += " blur(" + document.getElementById("blur_btn").value + "px)";  //blur(0px)
	
	movie.style.filter = filter;
}

function set_title(){
	//movie.textTracks[0].mode = title_mode;
	movie_title.mode = "hidden";
	title_num ++;
	if(title_num >= movie.textTracks.length){
		title_num = 0;
	}
	movie_title = movie.textTracks[title_num];
	movie_title.mode = title_mode;
}

function display_titles(){
	let current_title = "";
	if(movie_title.activeCues.length > 0){
		for(let i = 0; i < movie_title.activeCues.length; i ++){
			current_title += movie_title.activeCues[i].id + ": " + movie_title.activeCues[i].text;
		}
	}
	document.getElementById("subtitle_place").innerHTML = current_title;
}