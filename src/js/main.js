window.onload = function() 
{
	var game = new Phaser.Game(1280, 700, Phaser.AUTO, '');

	var run = {
        //PRELOAD
        preload: function(){
          this.game.load.image('bg','../assets/bg2.png');
        
        },
        create: function(){
            this.game.bg=this.game.add.sprite(0,0,'bg');
          
           
        },
        update:function(){

        },    
    };



    var menu = {
        //PRELOAD
        preload: function(){
          this.game.load.image('bg','../assets/bg2.png');
        
        },
        create: function(){
            this.game.bg=this.game.add.sprite(0,0,'bg');
          
           
        },
        update:function(){

        },    
    };
   
    //------------------STATS-----------------
    game.state.add('run',run);
    game.state.add('menu',menu);
    game.state.start('menu',run);

    //---------------------------------------

};