function Cacahuete(game,x,y){
    this.refGame=game;
    this.sprite = game.add.sprite(x, y, 'cacahuete');
    this.sprite.animations.add('run');
    this.sprite.animations.play('run', 5, true);
};
Cacahuete.prototype.constructor = Cacahuete;
Cacahuete.prototype.update = function(){
    var player = this.refGame.character.sprite;
    if(player.x > this.sprite.x && player.x < this.sprite.x+this.sprite.width && 
        player.y > this.sprite.y && player.y < this.sprite.y+this.sprite.height){
        global.cacahueteEtoile = 1;
        game.add.tween(this.sprite.scale).to( { x: 0, y: 0 }, 1000 , Phaser.Easing.Elastic.Out, true);
        this.sprite.destroy();
    }
    if(player.x > this.sprite.x && player.x < this.sprite.x+140 && 
        player.y > this.sprite.y && player.y < this.sprite.y+30){
        console.log(true)
    }
};
