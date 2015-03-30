window.onload = function() 
{
	var game = new Phaser.Game(1280, 700, Phaser.AUTO, '');


	var map;
	var tileset;
	var layer;
	var player;
	
	
	var cursors;
	var bg;

	var run = {
        //PRELOAD
        preload: function(){
        	this.game.load.image('bg','src/assets/magic.jpg');
    		this.game.load.tilemap('level1', 'src/assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
   	 		this.game.load.image('tiles-1', 'src/assets/tiles-1.png');
    		this.game.load.spritesheet('dude', 'src/assets/dude.png', 32, 48);
    		this.game.load.spritesheet('droid', 'src/assets/droid.png', 32, 32);
    		this.game.load.image('starSmall', 'src/assets/star.png');
    		this.game.load.image('starBig', 'src/assets/star2.png');
    		this.game.load.image('background', 'src/assets/background2.png');
        
        },
        create: function(){
            //--init des instance d'objets
            
            //

        	this.game.bg=this.game.add.sprite(200,0,'bg');
        	

			game.stage.backgroundColor = '#000000';

			bg = game.add.tileSprite(0, 0, 800, 600, 'background');
			bg.fixedToCamera = true;

			map = game.add.tilemap('level1');

			map.addTilesetImage('tiles-1');

			map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);

			layer = map.createLayer('Tile Layer 1');

			layer.resizeWorld();

			
            this.game.character = new Character(game);
            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.physics.arcade.gravity.y = 250;

		},
        update:function()
        {
            game.physics.arcade.collide(game.character.sprite, layer); //CALCUL DE LA PHYSIC SE PASSE ICI
            this.game.character.update();
	    	

	   }
    }   


    var menu = {
        //PRELOAD
        preload: function(){
          this.game.load.image('bg','src/assets/magic.jpg');
          console.log("----PRELOAD DONE---");
        },
        create: function(){
            this.game.bg=this.game.add.button(0,0,"bg",this.goRun);
          
           console.log("----CREATE DONE---");
        },
        update:function(){
        	 console.log("up");

        },
        goRun:function(){
            game.state.start('run');
        },    
    };
   
    //------------------STATS-----------------
    game.state.add('run',run);
    game.state.add('menu',menu);
    game.state.start('menu',run);

    //---------------------------------------

};