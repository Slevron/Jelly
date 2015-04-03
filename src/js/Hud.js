function Hud(game){
	var that = this;
	this.refGame = game;
	this.sprites = {coeur:game.add.sprite(50,50,"coeur")};
	this.sprites.coeur.fixedToCamera = true;
	this.sprites.coeur.animations.add("good",[0,0,0,0,0,0,0,00,0,0,1,0,1],8,true);
	this.sprites.coeur.animations.add("bad",[2,2,2,2,2,2,3],12,true);
	this.sprites.coeur.animations.play("good");
	this.sprites.pause = game.add.button(1280-150 , 50, 'playButton',function(){
		that.refGame.pauseGame = !that.refGame.pauseGame;
	});
	this.sprites.pause.fixedToCamera = true;

	this.sprites.pause.inputEnabled = true;
	this.sprites.pause.events.onInputUp.add(function () {this.refGame.paused = true;},this);
	game.input.onDown.add(function () {if(this.refGame.paused)this.refGame.paused = false;},this);

	this.changeAnim = function (nameObjectToChange, animName){
		this.sprites[nameObjectToChange].play(animName);
	}
};
