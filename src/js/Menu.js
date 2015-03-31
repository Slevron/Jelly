var MenuState = function(game) {  }; 
MenuState.prototype = 
{
        //PRELOAD
        preload: function(){
          this.game.load.image('bg','src/assets/magic.jpg');
        },
        create: function(){
            this.game.bg=this.game.add.button(0,0,"bg",this.goRun);
        },
        update:function(){
        },
        goRun:function(){
            game.state.start('LevelState');
        },    
    };