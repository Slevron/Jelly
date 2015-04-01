function Cacahuete(game,x,y){
    this.refGame=game;
    this.sprite = game.add.sprite(x, y, 'cacahuete');
    this.sprite.animations.add('run');
    this.sprite.animations.play('run', 5, true);
};
Cacahuete.prototype.constructor = Cacahuete;
Cacahuete.prototype.update = function(){

};
