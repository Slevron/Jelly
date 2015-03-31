function Spider (game,x,y){
	Enemy.call(game);
	this.sprite = game.enemies.create(x,y,32,32,"dude");
}
Spider.prototype.constructor = Spider;
Spider.prototype.update = function () {

};