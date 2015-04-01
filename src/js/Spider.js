function Spider (game,x,y,waypoints){
	Enemy.call(this,game);
	this.sprite = game.enemies.create(x,y,"dude",5);
	this.sprite.refThis = this;
	this.sprite.anchor.set(0.5);

	this.speed = 100;

	this.waypoints = [];
	for(var i = 0; i < waypoints.length; i++) {
		this.waypoints[i] = {x:this.sprite.x,y:this.sprite.y};
		this.waypoints[i].x += waypoints[i].x;
	}

	this.nextWaypoint = 0;

	this.isDowned = false;
	this.currentDown = 0;
	this.maxDown = 100;
};
Spider.prototype = Object.create(Enemy.prototype);
Spider.prototype.constructor = Spider;
Spider.prototype.update = function () {
	//

	if (this.playerInSight()){
		this.goDown();
		console.log("IN SIGHT")
	}
	else if (!this.playerInSight() && this.isDowned){
		this.goUp();
		console.log("NOT IN SIGHT")
	}
	else{
		if(this.checkIfWaypointReached()){
			this.changeToNextWaypoint();
		}
		this.moveToNextWaypoint();
	}
	return;
};
Spider.prototype.move = function (dir) {
	if(dir == "left"){
		this.sprite.x -= this.speed * this.refGame.time.deltaTime;
	}
	else if (dir == "right"){
		this.sprite.x += this.speed * this.refGame.time.deltaTime;
	}
	return;
};
Spider.prototype.checkIfWaypointReached = function () {
	//
	var waypoint = this.waypoints[this.nextWaypoint];

	if((this.sprite.x >= waypoint.x + 6)      // trop à droite

	    || (this.sprite.x + this.sprite.width <= waypoint.x) // trop à gauche

	    || (this.sprite.y >= waypoint.y + 32) // trop en bas

	    || (this.sprite.y + this.sprite.height <= waypoint.y)){
		return false;
	}
	else{
		return true;
	}
};
Spider.prototype.changeToNextWaypoint = function () {
	this.nextWaypoint++;
	if(this.nextWaypoint >= this.waypoints.length){
		this.nextWaypoint = 0;
	}
	return;
};
Spider.prototype.moveToNextWaypoint = function () {
	//
	var waypoint = this.waypoints[this.nextWaypoint];
	
	if (this.sprite.x > waypoint.x){

		//Left
		if (this.facing == "right") {
			this.changeFacing("left");
		}
		this.move("left");
	}
	else {
		//Right
		if (this.facing == "left") {
			this.changeFacing("right");
		}
		this.move("right");
	}

	if(this.currentState != "Move"){
		this.changeCurrentState("Move");
	}
	return;
};
Spider.prototype.playerInSight = function(){
	var player = this.refGame.character.sprite;
	if(player.body.center.x < this.sprite.x+this.sprite.width &&
	player.body.center.x > this.sprite.x){
		return true;
	}
};
Spider.prototype.goDown = function () {
	if(this.currentDown == this.maxDown){
		return;
	}
	if(!this.isDowned){
		this.isDowned = true;
	}

	var speed = (this.speed * 0.9) * this.refGame.time.deltaTime;
	this.sprite.y += speed;
	this.currentDown += speed;
	if(this.currentDown > this.maxDown){
		this.sprite.y -= this.currentDown - this.maxDown;
		this.currentDown = this.maxDown;
	}
};

Spider.prototype.goUp = function () {
	if(!this.isDowned){
		return;
	}

	var speed = (this.speed * 0.75) * this.refGame.time.deltaTime;
	this.sprite.y -= speed;
	this.currentDown -= speed;
	if(this.currentDown <= 0){
		this.sprite.y += this.currentDown;
		this.isDowned = false;
		this.currentDown = 0;
	}
};