window.onload = function() 
{
	var game = new Phaser.Game(1280, 700, Phaser.AUTO, '');


	var map;
	var tileset;
	var layer;
	var player;
	var facing = 'left';
	var jumpTimer = 0;
	var cursors;
	var jumpButton;
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
        	this.game.bg=this.game.add.sprite(200,0,'bg');
        	game.physics.startSystem(Phaser.Physics.ARCADE);

			game.stage.backgroundColor = '#000000';

			bg = game.add.tileSprite(0, 0, 800, 600, 'background');
			bg.fixedToCamera = true;

			map = game.add.tilemap('level1');

			map.addTilesetImage('tiles-1');

			map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);

			layer = map.createLayer('Tile Layer 1');

			layer.resizeWorld();

			game.physics.arcade.gravity.y = 250;

			player = game.add.sprite(32, 32, 'dude');
			game.physics.enable(player, Phaser.Physics.ARCADE);

			player.body.bounce.y = 0.2;
			player.body.collideWorldBounds = true;
			player.body.setSize(20, 32, 5, 16);

			player.animations.add('left', [0, 1, 2, 3], 10, true);
			player.animations.add('turn', [4], 20, true);
			player.animations.add('right', [5, 6, 7, 8], 10, true);

			game.camera.follow(player);

			cursors = game.input.keyboard.createCursorKeys();
			jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		},
        update:function(){

	    	game.physics.arcade.collide(player, layer);

    		player.body.velocity.x = 0;

   			 if (cursors.left.isDown)
    		{
        		player.body.velocity.x = -150;

        		if (facing != 'left')
       			{
            		player.animations.play('left');
            		facing = 'left';
       			}
    		}
    		else if (cursors.right.isDown)
    		{
      			player.body.velocity.x = 150;

        		if (facing != 'right')
        		{
           	 		player.animations.play('right');
            		facing = 'right';
        		}
    		}
    		else
    		{
        		if (facing != 'idle')
        		{
            		player.animations.stop();

            		if (facing == 'left')
            		{
            	    	player.frame = 0;
           		 	}
            		else
            		{	
                		player.frame = 5;
            		}	

            		facing = 'idle';
        		}
    		}
    
  			if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
    		{
        		player.body.velocity.y = -250;
       			jumpTimer = game.time.now + 750;
    		}
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