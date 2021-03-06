

var LevelState = function(game,id) {
    global.idLevel = id;
}; 
LevelState.prototype = 
{
        //PRELOAD
        
        preload: function(){

            this.game.load.image('background1','src/assets/background1.png');
            this.game.load.image('background2','src/assets/background2.png');
            this.game.load.image('background3','src/assets/background3.png');
            this.game.load.image('background4','src/assets/background4.png');
            game.load.spritesheet('playButton', 'src/assets/bouton/play.png', 392/5, 95);
            game.load.spritesheet('pause', 'src/assets/bouton/pause.png', 392/5, 95);
            this.game.load.json('config'+global.idLevel+'', 'src/json/config'+global.idLevel+'.json');
            this.game.load.tilemap('level'+global.idLevel+'', 'src/json/level'+global.idLevel+'.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('tiles', 'src/assets/tileset.png');
            this.game.load.spritesheet('button1', "src/assets/bouton/replay.png",78,94);
            this.game.load.spritesheet('dude', 'src/assets/dude.png', 117, 131);
            this.game.load.spritesheet('ponpon', 'src/assets/ponpon.png', 117, 131);
            this.game.load.spritesheet("spider", "src/assets/spider.png", 1250/12, 121);
            this.game.load.image("fil", "src/assets/fil.png");
            this.game.load.spritesheet("worm", "src/assets/ver.png",123,105);
            this.game.load.spritesheet("roach", "src/assets/roach.png",123,105);
            this.game.load.atlasJSONHash('cacahuete', 'src/assets/cacahuete.png', 'src/assets/cacahuete.json');
            this.game.load.image('starSmall', 'src/assets/star.png');
            this.game.load.image('starBig', 'src/assets/star2.png');
            this.game.load.image('fur1','src/assets/poil1.png');
            this.game.load.image('fur2','src/assets/poil2.png');
            this.game.load.image('fur3','src/assets/poil3.png');
            this.game.load.image('credit','src/assets/decor/credit.png');
            this.game.load.spritesheet("tadPoil", "src/assets/taspoil.png",117,135);
            this.game.load.spritesheet("coeur", "src/assets/hud/coeur.png",60,59);
            this.game.load.spritesheet('replay', "src/assets/bouton/replay.png",78,94);
        },
        create: function(){
            
            game.add.plugin(Phaser.Plugin.Debug);
            game.input.gamepad.start();

            // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
            game.pad = game.input.gamepad.pad1;

            game.pauseGame = false;

            game.backgrounds = [];
            for(var i = 0; i < 4; i++){
                game.backgrounds[i]= game.add.sprite(i*1280,0,"background"+(Math.floor((Math.random() * 4) + 1)));
            }
            
            /*game.background = game.add.sprite(0,0,"bg");
            game.background.fixedToCamera = true;*/
            game.editorSprite = null;

            var phaserJSON = game.cache.getJSON('config'+global.idLevel+'');
        
            game.add.plugin(Phaser.Plugin.Debug);
            //Map
            this.game.map = new Map(game,global.idLevel);
            game.enemies = game.add.group();

            //Rewards
            global.test = phaserJSON.reward.cacahueteMax;
            global.timeMax = phaserJSON.reward.timeMax;
            global.actionMax = phaserJSON.reward.actionMax;

            //Cacahuete
            game.cacahuete = new Cacahuete(game,phaserJSON.cacahuete.x,phaserJSON.cacahuete.y,phaserJSON.cacahuete.hide,phaserJSON.forground);
            game.tadPoils = game.add.group();

            //Roach
            for (var i = 0; i < phaserJSON.roachs.length; i++) {
                new Roach(game,phaserJSON.roachs[i].x,phaserJSON.roachs[i].y,phaserJSON.roachs[i].waypoints);
            };
            //Spider
            for (var i = 0; i < phaserJSON.spiders.length; i++) {
                new Spider(game,phaserJSON.spiders[i].x,phaserJSON.spiders[i].y,phaserJSON.spiders[i].waypoints,phaserJSON.spiders[i].maxDown);
            };
            //Worm
            for (var i = 0; i < phaserJSON.worms.length; i++) {
                new Worm(game,phaserJSON.worms[i].x,phaserJSON.worms[i].y,phaserJSON.worms[i].waypoints);
            };
            //TadPoil
            for (var i = 0; i < phaserJSON.tadPoils.length; i++) {
                new TadPoil(game,phaserJSON.tadPoils[i].x,phaserJSON.tadPoils[i].y);
            };
            //Character
            this.game.character = new Character(game,phaserJSON.player.x,phaserJSON.player.y);

            //Explosions
            this.game.explosions = [];
            game.shoots = game.add.group();
            game.physics.enable(this.game.shoots, Phaser.Physics.ARCADE);

            //Physics
            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.physics.arcade.gravity.y = 1500;

            //Forground
            if(phaserJSON.forground === true){
                game.forground = game.add.sprite(0,-100,"bg2");
                game.forground.fixedToCamera = true;
                game.forground.hide = phaserJSON.forground;
            }
            global.timeEtoile = 0;
            game.time.deltaTime = 0;
            game.time.lastNow = game.time.now;

            game.leHude = new Hud(game);
                game.input.gamepad.start();

    // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
    pad1 = game.input.gamepad.pad1;
        },
        update:function()
        {
            game.time.deltaTime = game.time.elapsed/1000;
            global.timeEtoile += game.time.deltaTime/5;

            game.physics.arcade.collide(this.game.character.sprite, this.game.map.layer); //CALCUL DE LA PHYSIC SE PASSE ICI
            game.physics.arcade.collide(game.enemies, this.game.map.layer);
            game.physics.arcade.collide(game.tadPoils, this.game.map.layer);
            game.physics.arcade.collide(game.shoots, this.game.map.layer,function(bulletOver,mapOver){
                game.character.shoots.splice(bulletOver.refThis.indexArray);
                game.shoots.remove(bulletOver);
            });
            
            this.game.character.update();
            game.physics.arcade.overlap(game.character.sprite, game.tadPoils,function(charOver,tadPoilOver){
                charOver.refThis.takeDamage(-((1/game.character.scaleBase)-1),false);
                game.tadPoils.remove(tadPoilOver);
                console.log(game.character.scaleBase)
            });

            game.cacahuete.update();
            this.game.enemies.forEach(function(current){
                current.refThis.update();
            });
            
            game.physics.arcade.overlap(this.game.character.sprite, game.enemies,function(characterOver,enemyOver){
                if(characterOver.refThis.hitable && enemyOver.refThis.alive){
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
                    game.hurt.play("",0,1);
                    characterOver.refThis.takeDamage(0.1,true);
                }
            });

            game.physics.arcade.overlap(game.shoots, game.enemies, function(bulletOver,enemyOver){
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
            if(this.game.character.alive == false && this.game.character.timeBeforeGameOver <= 0){
                game.state.start('GameOverState');
            }
            else if(this.game.character.alive == false && this.game.character.sprite.x > this.game.camera.x+this.game.camera.width){
                game.state.start("ScoreState");
            }
       },

       onDragStop:function(){
            game.result = sprite.key + " dropped at x:" + sprite.x + " y: " + sprite.y;
       },

       render:function() {
           // game.debug.text(global.timeEtoile|0, 1280*0.5, 20);

       },

       goSprite:function() {
            game.editorSprite = this.key;

       }
    }   
