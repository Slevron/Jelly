function Roach (game,x,y,waypoints){
	Enemy.call(game);
	this.sprite = game.enemies.create(x,y,"dude",5);
	this.sprite.refThis = this;
	this.facing = "right";
	this.waypoints = waypoints || [{x:0,y:0},{x:0,y:0}];
	this.nextWaypoint = 0;
};
Roach.prototype = Object.create(Enemy.prototype);
Roach.prototype.constructor = Roach;
Roach.prototype.update = function () {
	//
	this.move()
	return;
};
Roach.prototype.move = function () {
	if (this.playerInSight()){
		this.moveToPlayer();
	}
	else{
		if(this.checkIfWaypointReached()){
			this.changeToNextWaypoint();
		}
		this.moveToNextWaypoint();
	}
	return;
};
Roach.prototype.checkIfWaypointReached = function () {
	//
	var waypoint = this.waypoints[this.nextWaypoint];
	if(this.sprite.x <= waypoint.x+32 &&
		this.sprite.x+this.sprite.width >= waypoint.x &&
		this.sprite.y <= waypoint.y+32 &&
		this.sprite.y >= waypoint.y){
		return true;
	}
	return false;
};
Roach.prototype.changeToNextWaypoint = function () {
	this.nextWaypoint++;
	if(this.nextWaypoint >= this.waypoints.length){
		this.nextWaypoint = 0;
	}
	return;
};
Roach.prototype.moveToNextWaypoint = function () {
	//
	var waypoint = this.waypoints[this.nextWaypoint];
	if (this.x > waypoint.x){
		//Left
		if (this.facing == "right") {
			this.changeFacing("left");
		}
		this.sprite.x -= this.speed * this.refGame.time.physicsElapsed;
	}
	else {
		//Right
		if (this.facing == "left") {
			this.changeFacing("right");
		}
	console.log("lol",this)
		this.sprite.x += this.speed * this.refGame.time.now;
	}

	if(this.currentState != "Move"){
		this.changeCurrentState("Move");
	}
	return;
};
Roach.prototype.moveToPlayer = function () {
	//
	if(this.x > this.refGame.character.sprite.x+(this.refGame.character.sprite.width*0.5)){
		//Move left
		this.sprite.x -= this.speed * this.refGame.time.physicsElapsed;
	}
	else {
		//Move right
		this.sprite.x += this.speed * this.refGame.time.physicsElapsed;
	}
	return;
};

Roach.prototype.playerInSight = function () {
	return false;
};