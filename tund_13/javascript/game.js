let canvas;
let ctx;
let ball_list = [];
let elements_limit = 15;


window.onload = function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	init_game();
}

function init_game(){
	add_elements();
	canvas.addEventListener("mousedown", check_hits);
}

function add_elements(){
	let x = canvas.width / 2;
	let y = canvas.height / 2;
	//let r = 15;
	for(let i = 0; i < elements_limit; i ++){
		let r = 15 + Math.round(Math.random() * 15);
		ball_list.push(new Game_ball(x,y,r));
	}
	//move_1();
	//ball = new Game_ball(x,y,r);
	move_elements();
}

function move_elements(){
	canvas.width = canvas.width;
	ctx.fillStyle = "#FFCC00";
	//ball.move_self();
	//ball.draw_self();
	for(let i = 0; i < ball_list.length; i ++){
		ball_list[i].move_self();
		ball_list[i].draw_self();
	}
	if(ball_list.length > 0){
		requestAnimationFrame(move_elements);
	}
}

function check_hits(e){
	let m_x = e.clientX - canvas.offsetLeft + window.scrollX;
	let m_y = e.clientY - canvas.offsetTop + window.scrollY;
	for(let i = 0; i < ball_list.length; i ++){
		if(ball_list[i].was_hit(m_x, m_y)){
			//eemaldan selle elemendi
			ball_list.splice(i, 1);
			break;
		}
	}
}

function pythagoras(b_x, b_y, m_x, m_y){
	return Math.sqrt(Math.pow(b_x - m_x, 2) + Math.pow(b_y - m_y,2));
}

class Game_ball{
	constructor(x,y,r){
		this.x = x;
		this.y = y; 
		this.r = r;
		this.speed_x = 0;
		this.speed_y = 0;
		this.set_speed();
		this.draw_self();
	}
	
	draw_self(){
		ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
			ctx.fill();
		ctx.closePath();
	}
	
	set_speed(){
		while(this.speed_x == 0 && this.speed_y == 0){
			//juhuslikud kiirused -5 ... 5
			this.speed_x = 5 - Math.round(Math.random()* 10);
			this.speed_y = 5 - Math.round(Math.random()* 10);
		}
	}
	
	move_self(){
		//ega pole servale jõudnud
		if(this.x <= this.r || this.x >= canvas.width - this.r){
			this.speed_x *= -1;
		}
		if(this.y <= this.r || this.y >= canvas.height - this.r){
			this.speed_y *= -1;
		}
		this.x += this.speed_x;
		this.y += this.speed_y;
	}
	
	was_hit(m_x, m_y){
		return pythagoras(this.x, this.y, m_x, m_y) <= this.r
	}
}//class lõppeb

function move_1(){
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.width = canvas.width;
	ctx.fillStyle = "#FFCC00";
	x += speed_x;
	y += speed_y;
	//ega pole servale jõudnud
	if(x <= r || x >= canvas.width - r){
		speed_x *= -1;
	}
	if(y <= r || y >= canvas.height - r){
		speed_y *= -1;
	}
	ctx.beginPath();
		ctx.arc(x, y, r, 0, 2 * Math.PI);
		ctx.fill();
	ctx.closePath();
	requestAnimationFrame(move_1);
}
