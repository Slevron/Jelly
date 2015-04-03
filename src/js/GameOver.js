function GameOver(game,callback,callback2){
    this.refGame=game;
    this.sprite = game.add.sprite(0, -2000, 'credit');
    this.bgTween = game.add.tween(this.sprite).to({x:0,y:0}, 500, Phaser.Easing.Cubic.In,true);
    this.bgTween.onComplete.add(callback, this);
    this.callback = callback2;
};
GameOver.prototype.constructor = GameOver;
GameOver.prototype.show = function(){
    button = this.refGame.add.button(1280/2, 450,'button1',this.callback);
    button.scale.set(0);
    button.anchor.set(0.5);
    tween = this.refGame.add.tween(button.scale).to( { x: 1.2, y: 1.2 }, 1000 , Phaser.Easing.Elastic.Out, true);
}