var MenuState = function(game) {  }; 
MenuState.prototype = 
{
        //PRELOAD
        preload: function(){
          this.game.load.image('play','src/assets/play.png');
        },
        create: function(){
            this.game.bg=this.game.add.button(1280/2,300,"play",this.goRun);
            this.game.bg.anchor.setTo(0.5,0.5);
        },
        update:function(){
        },
        goRun:function(){
            game.state.start('LevelState');
        },    
    };