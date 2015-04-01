function Enemy(game){
	this.refGame = game;

	this.sprite = null;
	this.facing = "right";

	this.health = 1;
	this.speed = 1;
	this.damage = 1;
	this.alive = true;

	this.currentState = "Idle";
	this.oldState = "Null";
};
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function () {
	//
};

Enemy.prototype.move = function () {
	//
};

Enemy.prototype.hit = function () {
	//
};

Enemy.prototype.takeDamage = function (damage) {
	this.health -= damage;
	this.changeCurrentState("Taking Damage");

	if (this.health <= 0) {
		this.kill();
	}
	return;
};

Enemy.prototype.kill = function () {
	//
	this.refGame.enemies.remove(this.sprite);
	//this.changeCurrentState("Kill");
};

Enemy.prototype.sideComparedTo = function (x) {
	if(this.sprite.x > x){
		return "right";
	}
	else {
		return "left";
	}
};

Enemy.prototype.changeFacing = function (dir) {
	if(dir == this.facing){
		return false;
	}
	else{
		this.facing = dir;
		if(this.facing == "left"){
			this.sprite.scale.x = -1;
		}
		else if (this.facing == "right"){
			this.sprite.scale.x = 1;
		}
		return true;
	}
};

Enemy.prototype.changeCurrentState = function (newState) {
	if(this.newState == this.currentState){
		return false;
	}
	switch(this.newState){
		case "Null":
			//
		break;
		case "Idle":
			//
		break;
		case "Move":
			//
		break;
		case "Taking Damage":
		//
		break;
		case "Kill":
			//
		break;
	}
	return true;
};