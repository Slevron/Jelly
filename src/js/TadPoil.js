function TadPoil(game,x,y){
	this.refGame = game;
	this.sprite = game.tadPoils.create(x,y,"tadPoil");

	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.setSize(this.sprite.body.width,this.sprite.body.height*0.25,this.sprite.body.offsetX,50);
	this.sprite.animations.add("idle",[0,1,2,3,4,5],10,true);
	this.sprite.refThis = this;
	this.sprite.animations.play("idle");
}