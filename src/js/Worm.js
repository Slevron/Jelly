function Worm(game,x,y){
	Enemy.call(this,game);
	this.sprite = game.enemies.create(x,y,32,32,"dude");
};
Worm.prototype = Object.create(Enemy.prototype);
Worm.prototype.constructor = Worm;
Worm.prototype.update = function () {

};