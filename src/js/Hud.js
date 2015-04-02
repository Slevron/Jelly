function Hud(game){
	this.refGame = game;
	this.sprites = {coeur:game.add.sprite(50,50,"coeur")};
	this.sprites.coeur.fixedToCamera = true;
	this.sprites.coeur.animations.add("good",[0,0,0,0,0,0,0,00,0,0,1,0,1],8,true);
	this.sprites.coeur.animations.add("bad",[2,2,2,2,2,2,3],3,true);
	this.sprites.coeur.animations.play("good");
	this.changeAnim = function (nameObjectToChange, animName){
		this.sprites[nameObjectToChange].play(animName);
	}
};
