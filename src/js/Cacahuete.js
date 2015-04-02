function Cacahuete(game,x,y,hide){
    this.refGame=game;
    this.sprite = game.add.sprite(x, y, 'cacahuete');
    this.sprite.animations.add('run');
    this.sprite.animations.play('run', 5, true);
    this.hidePoussiere = hide;
    this.sprite.alpha = this.hidePoussiere === true ? 0.3 : 1;
};
Cacahuete.prototype.constructor = Cacahuete;
Cacahuete.prototype.update = function(){
    var player = this.refGame.character.sprite;
    if(player.x > this.sprite.x && player.x < this.sprite.x+this.sprite.width && 
        player.y > this.sprite.y && player.y < this.sprite.y+this.sprite.height){
        global.cacahueteEtoile = 1;
        game.add.tween(this.sprite).to( { x: 0, y: 0 }, 1000 , Phaser.Easing.Elastic.Out, true);
        this.sprite.destroy();
    }
    if(this.refGame.forground.hide === true){
        if(player.x > this.sprite.x && player.x < this.sprite.x+250 && 
            player.y > this.sprite.y && player.y < this.sprite.y+this.sprite.height && this.hidePoussiere === true){
            tween = game.add.tween(this.refGame.forground).to( { alpha: 0.2 }, 1000 , Phaser.Easing.Elastic.Out, true);
            tween2 = game.add.tween(this.sprite).to( { alpha: 1 }, 1000 , Phaser.Easing.Elastic.Out, true);        
        }else{
            tween = game.add.tween(this.refGame.forground).to( { alpha: 1 }, 1000 , Phaser.Easing.Elastic.Out, true);
            tween2 = game.add.tween(this.sprite).to( { alpha: 0.3 }, 1000 , Phaser.Easing.Elastic.Out, true);
        }  
    }
};

