
var LevelState = function(game,id) {
    global.idLevel = id;
}; 
LevelState.prototype = 
{
        //PRELOAD
        
        preload: function(){
            console.log(idLevel)
            this.game.load.json('config'+idLevel+'', 'src/json/config'+idLevel+'.json');
        	this.game.load.image('bg','src/assets/magic.jpg');

    		this.game.load.tilemap('level'+idLevel+'', 'src/json/level'+idLevel+'.json', null, Phaser.Tilemap.TILED_JSON);

   	 		this.game.load.image('tiles-1', 'src/assets/tiles-1.png');
    		this.game.load.spritesheet('dude', 'src/assets/dude.png', 115, 131);
    		this.game.load.spritesheet('droid', 'src/assets/droid.png', 32, 32);
    		this.game.load.image('starSmall', 'src/assets/star.png');
    		this.game.load.image('starBig', 'src/assets/star2.png');
    		this.game.load.image('background', 'src/assets/background2.png');
        
        },
        create: function(){
            //--init des instance d'objets
            
            var phaserJSON = game.cache.getJSON('config'+idLevel+'');
        
            game.add.plugin(Phaser.Plugin.Debug);
            
            game.stage.backgroundColor = '#FFFFFF';

            //bg = game.add.tileSprite(0, 0, 800, 600, 'background');
            //bg.fixedToCamera = true;
            this.game.map = new Map(game,idLevel);

            game.enemies = game.add.group();
 
            //Rewards
            global.cacahueteMax = phaserJSON.reward.cacahueteMax;
            global.timeMax = phaserJSON.reward.timeMax;
            global.actionMax = phaserJSON.reward.actionMax;
            //
            for (var i = 0; i < phaserJSON.roachs.length; i++) {
                new Roach(game,phaserJSON.roachs[i].x,phaserJSON.roachs[i].y,phaserJSON.roachs[i].waypoints);
            };
            this.game.character = new Character(game,phaserJSON.player.x,phaserJSON.player.y);
            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.physics.arcade.gravity.y = 1500;
            game.time.deltaTime = 0;
            game.time.lastNow = game.time.now;

		},
        update:function()
        {
            game.time.deltaTime = game.time.elapsed/1000;
            game.physics.arcade.collide(game.character.sprite, this.game.map.layer); //CALCUL DE LA PHYSIC SE PASSE ICI
            game.physics.arcade.collide(game.enemies, this.game.map.layer);

            this.game.character.update();

            this.game.enemies.forEach(function(current){
                current.refThis.update();
            });

            game.physics.arcade.overlap(game.character.sprite, game.enemies,function(characterOver,enemyOver){
                if(characterOver.refThis.hitable){
                    if(enemyOver.x > characterOver.x+(characterOver.width*0.5)){
                        //right so bounce left
                        characterOver.body.velocity.x = -1200;
                        characterOver.body.velocity.y = -300;
                    }
                    else{
                        //left so bounce right
                        characterOver.body.velocity.x = 1200;
                        characterOver.body.velocity.y = -300;
                    }
                    characterOver.refThis.takeDamage(0.1);
                }
            });
	   }
    }   