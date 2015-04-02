function Roach (game,x,y,waypoints){
	Enemy.call(this,game);
	this.sprite = game.enemies.create(x,y,"roach",5);
	this.sprite.refThis = this;
	this.sprite.anchor.set(0.5);
	
	this.sprite.animations.add("walk", [0,1,2], 10, true);
	var anim = this.sprite.animations.add("death", [3,4,5,6,7,8], 10, false);
	anim.onComplete.add(this.kill,this);

	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.setSize(this.sprite.body.width,this.sprite.body.height*0.4);

	this.speed = 100;

	this.waypoints = [];
	for(var i = 0; i < waypoints.length; i++) {
		this.waypoints[i] = {x:this.sprite.x,y:this.sprite.y};
		this.waypoints[i].x += waypoints[i].x;
	}
	this.sprite.animations.play("walk");
	this.nextWaypoint = 0;
};
Roach.prototype = Object.create(Enemy.prototype);
Roach.prototype.constructor = Roach;
Roach.prototype.update = function () {
	//
	if(!this.alive){
		return;
	}
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
Roach.prototype.move = function (dir) {
	if(dir == "left"){
		this.sprite.x -= this.speed * this.refGame.time.deltaTime;
	}
	else if (dir == "right"){
		this.sprite.x += this.speed * this.refGame.time.deltaTime;
	}
	return;
};
Roach.prototype.checkIfWaypointReached = function () {
	//
	var waypoint = this.waypoints[this.nextWaypoint];

	if((this.sprite.x >= waypoint.x + 6)      // trop à droite

	    || (this.sprite.x + this.sprite.width <= waypoint.x) // trop à gauche

	    || (this.sprite.y >= waypoint.y + 64) // trop en bas

	    || (this.sprite.y + this.sprite.height <= waypoint.y)){
		return false;
	}
	else{
		return true;
	}
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
	
	if (this.sprite.x > waypoint.x){

		//Left
		if (this.facing == "left") {
			this.changeFacing("right");
		}
		this.move("left");
	}
	else {
		//Right
		if (this.facing == "right") {
			this.changeFacing("left");
		}
		this.move("right");
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
		this.move("left");
	}
	else {
		//Move right
		this.move("right");
	}
	return;
};
Roach.prototype.playerInSight = function () {
	return false;
};