

var LevelState = function(game,id) {
    global.idLevel = id;
}; 
LevelState.prototype = 
{
        //PRELOAD
        
        preload: function(){
            this.game.load.image('bg','src/assets/bg.png');
            this.game.load.image('bg2','src/assets/bg2.png');

            this.game.load.json('config'+global.idLevel+'', 'src/json/config'+global.idLevel+'.json');
            this.game.load.tilemap('level'+global.idLevel+'', 'src/json/level'+global.idLevel+'.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('tiles', 'src/assets/tiles.png');

            this.game.load.spritesheet('dude', 'src/assets/dude.png', 117, 131);
            this.game.load.spritesheet('ponpon', 'src/assets/ponpon.png', 117, 131);
            this.game.load.spritesheet("spider", "src/assets/spider.png", 1250/12, 121);
            this.game.load.spritesheet("worm", "src/assets/ver.png",123,105);
            this.game.load.spritesheet("roach", "src/assets/roach.png",123,105);
            this.game.load.atlasJSONHash('cacahuete', 'src/assets/cacahuete.png', 'src/assets/cacahuete.json');
            this.game.load.image('starSmall', 'src/assets/star.png');
            this.game.load.image('starBig', 'src/assets/star2.png');
            this.game.load.spritesheet('fur','src/assets/poil.png',353/3,135);
        },
        create: function(){
            //--init des instance d'objets
            
            game.add.plugin(Phaser.Plugin.Debug);
            
            game.background = game.add.sprite(0,0,"bg");
            game.background.fixedToCamera = true;
            game.editorSprite = null;

            var phaserJSON = game.cache.getJSON('config'+global.idLevel+'');
        
            game.add.plugin(Phaser.Plugin.Debug);
            //Map
            this.game.map = new Map(game,global.idLevel);
            game.enemies = game.add.group();

            //Rewards
            global.cacahueteMax = phaserJSON.reward.cacahueteMax;
            global.timeMax = phaserJSON.reward.timeMax;
            global.actionMax = phaserJSON.reward.actionMax;

            //Cacahuete
            game.cacahuete = new Cacahuete(game,phaserJSON.cacahuete.x,phaserJSON.cacahuete.y,phaserJSON.cacahuete.hide);

            //Enemies
            for (var i = 0; i < phaserJSON.roachs.length; i++) {
                new Roach(game,phaserJSON.roachs[i].x,phaserJSON.roachs[i].y,phaserJSON.roachs[i].waypoints);
            };
            for (var i = 0; i < phaserJSON.spiders.length; i++) {
                new Spider(game,phaserJSON.spiders[i].x,phaserJSON.spiders[i].y,phaserJSON.spiders[i].waypoints,phaserJSON.spiders[i].maxDown);
            };
            for (var i = 0; i < phaserJSON.worms.length; i++) {
                new Worm(game,phaserJSON.worms[i].x,phaserJSON.worms[i].y,phaserJSON.worms[i].waypoints);
            };
            this.game.character = new Character(game,phaserJSON.player.x,phaserJSON.player.y);

            //Player
            this.game.explosions = [];
            this.game.shoots = game.add.group();

            //Physics
            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.physics.arcade.gravity.y = 1500;

            //Forground
            game.forground = game.add.sprite(0,-100,"bg2");
            game.forground.fixedToCamera = true;

            game.time.deltaTime = 0;
            game.time.lastNow = game.time.now;

            //Editor
            game.editor = new Editor(game,this.goSprite,this.onDragStop);
            
        },
        update:function()
        {
            game.time.deltaTime = game.time.elapsed/1000;
            game.physics.arcade.collide(this.game.character.sprite, this.game.map.layer); //CALCUL DE LA PHYSIC SE PASSE ICI
            game.physics.arcade.collide(game.enemies, this.game.map.layer);
            game.physics.arcade.collide(this.game.shoots, this.game.map.layer);

            this.game.character.update();
            game.cacahuete.update();
            this.game.enemies.forEach(function(current){
                current.refThis.update();
            });
            
            game.physics.arcade.overlap(this.game.character.sprite, game.enemies,function(characterOver,enemyOver){
                if(characterOver.refThis.hitable){
                    if(enemyOver.x > characterOver.x+(characterOver.width*0.5)){
                        //right so bounce left
                        characterOver.body.velocity.x = -600;
                        characterOver.body.velocity.y = -300;
                    }
                    else{
                        //left so bounce right
                        characterOver.body.velocity.x = 600;
                        characterOver.body.velocity.y = -300;
                    }
                    characterOver.refThis.takeDamage(0.1);
                }
            });

            game.physics.arcade.overlap(game.shoots, game.enemies, function(bulletOver,enemyOver){
                console.log("ARG")
                enemyOver.refThis.takeDamage(1);
                game.shoots.remove(bulletOver);
            });
            
            for(var i = 0; i < game.explosions.length; i++){
                if(game.explosions[i].update()){
                    game.explosions[i].sprite.destroy();
                    game.explosions[i] = null;
                    game.explosions.splice(i,1);
                    i--;
                }
            };
            game.editor.update();
       },

       onDragStop:function(){
            game.result = sprite.key + " dropped at x:" + sprite.x + " y: " + sprite.y;
       },

       render:function() {
            game.debug.text(game.result, 10, 20);
            /*game.enemies.forEach(function(cur){
                game.debug.body(cur);
            });*/
            game.shoots.forEach(function(cur){
                game.debug.body(cur);
            });
       },

       goSprite:function() {
            game.editorSprite = this.key;

       }


    }   
