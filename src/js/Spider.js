function Spider (game,x,y,waypoints,maxDown){
	Enemy.call(this,game);
	this.sprite = game.enemies.create(x,y,"spider",5);
	this.sprite.refThis = this;
	this.sprite.anchor.set(0.5);
	
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.allowGravity = false;
	this.sprite.body.setSize(this.sprite.body.width*0.70,this.sprite.body.height*0.70)

	this.sprite.animations.add("walk", [3,4,5], 10, true);
    this.sprite.animations.add("vertical", [0,1,2], 10, true);
    this.sprite.animations.add("idle", [0],true);
    var anim = this.sprite.animations.add("death", [6,7,8,9,10,11], 10, false);
    anim.onComplete.add(this.kill,this);

	this.speed = 100;

	this.waypoints = [];
	for(var i = 0; i < waypoints.length; i++) {
		this.waypoints[i] = {x:this.sprite.x,y:this.sprite.y};
		this.waypoints[i].x += waypoints[i].x;
	}

	this.nextWaypoint = 0;

	this.isDowned = false;
	this.currentDown = 0;
	this.maxDown = maxDown;
	this.fil = this.refGame.add.sprite(this.sprite.x,this.sprite.y,"fil");
	this.fil.height = 0;
};
Spider.prototype = Object.create(Enemy.prototype);
Spider.prototype.constructor = Spider;
Spider.prototype.update = function () {
	//
	if(!this.alive){
		return;
	}
	if (this.playerInSight()){
		this.goDown();
	}
	else if (!this.playerInSight() && this.isDowned){
		this.goUp();
	}
	else{
		this.sprite.animations.play("walk");
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

	if(this.facing == "right"){
		if(player.x > this.sprite.x && player.x < this.sprite.x+this.sprite.width){
			return true;
		}
	}
	else if (this.facing == "left"){
		if(player.x < this.sprite.x && player.x > this.sprite.x+this.sprite.width){
			return true;
		}
	}
	return false;
};
Spider.prototype.goDown = function () {
	if(this.currentDown == this.maxDown){
		this.sprite.animations.play("idle");
		return;
	}
	if(!this.isDowned){
		this.isDowned = true;
		this.fil.y = this.sprite.y;
		this.fil.x = this.sprite.x;
		this.fil.y -= this.sprite.height*0.35;
		if(this.sprite.scale.x >0)
			this.fil.x += 1;
		if(this.sprite.scale.x <0)
			this.fil.x -= 5;
		this.fil.height = 0;
	}
	this.sprite.animations.play("vertical");

	var speed = (this.speed * 0.9) * this.refGame.time.deltaTime;
	this.sprite.y += speed;
	this.currentDown += speed;
	this.fil.height += speed;
	if(this.currentDown > this.maxDown){
		this.sprite.y -= this.currentDown - this.maxDown;
		this.currentDown = this.maxDown;
	}
};

Spider.prototype.goUp = function () {
	if(!this.isDowned){
		return;
	}

	this.sprite.animations.play("vertical");
	var speed = (this.speed * 0.75) * this.refGame.time.deltaTime;
	this.sprite.y -= speed;
	this.currentDown -= speed;
	this.fil.height -= speed;
	if(this.currentDown <= 0){
		this.sprite.y += this.currentDown;
		this.isDowned = false;
		this.currentDown = 0;
		this.fil.height = 0;
	}
};

Spider.prototype.kill = function () {
	this.refGame.enemies.remove(this.sprite);
	this.fil.destroy();
};