var GameOverState = function(game) {  }; 
GameOverState.prototype = 
{
    //PRELOAD
    preload: function(){
        this.game.load.spritesheet("credit", "src/assets/decor/credit.png",1280,800);
        this.game.load.spritesheet("score", "src/assets/decor/score.png",1280,800);
    },
    create: function(){
        game.add.sprite(0,0,'score');
        game.die = new GameOver(game,this.goGameOver,this.goRetry);
    },
    update:function(){
    },

   goGameOver:function(){
        game.die.show()
   },

   goRetry:function(){
        new LevelState(game,global.idLevel);
        game.state.start('LevelState')
   }
}