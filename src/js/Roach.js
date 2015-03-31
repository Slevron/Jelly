function Roach (game,x,y){
	Enemy.call(game);
	this.sprite = game.enemies.create(x,y,32,32,"dude");
}
Roach.prototype.constructor = Roach;
Roach.prototype.update = function (){

};