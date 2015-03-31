function Enemy(game){
	this.refGame = game;
	this.health = 1;
	this.speed = 1;
	this.damage = 1;
	this.alive = true;
	this.currentState = "Idle";
	this.oldState = "Null";
}
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function () {
	
};

Enemy.prototype.move = function () {

};

Enemy.prototype.takeDamage = function () {

};

Enemy.prototype.kill = function () {

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
		case "Kill":
			//
		break;
	}
	return true;
};