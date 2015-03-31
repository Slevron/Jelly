function Roach (game){
	Enemy.call(game);
	this.sprite = game.enemies.create(32,32,"dude");
}
Roach.prototype.constructor = Roach;
Roach.prototype.update = function (){

};