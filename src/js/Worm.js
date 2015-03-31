function Worm(game,x,y){
	Enemy.call(game);
	this.sprite = game.enemies.create(x,y,32,32,"dude");
};
Worm.prototype.constructor = Worm;
Worm.prototype.update = function () {

};