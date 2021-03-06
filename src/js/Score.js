var ScoreState = function(game) {  }; 
ScoreState.prototype = 
{
    //PRELOAD
    preload: function(){
        
        this.game.load.image('decor','src/assets/decor/score.png');
        this.game.load.spritesheet("etoile", "src/assets/hud/etoile.png",192,199);
        this.game.load.image("hide", "src/assets/hud/cacahueteHide.png",115,131);
        this.game.load.spritesheet('button2', "src/assets/bouton/next.png",78,94);
        this.game.load.spritesheet('button1', "src/assets/bouton/replay.png",78,94);
        this.game.load.spritesheet('button0', "src/assets/bouton/niveaux.png",78,94);
        this.game.load.atlasJSONHash('show', 'src/assets/cacahuete.png', 'src/assets/cacahuete.json');

    },
    create: function(){
        game.add.sprite(0, 0, 'decor');
        if(global.cacahueteEtoile > 0){
            game.cacahueteShow = game.add.sprite(645, 355, 'show');                    
            game.cacahueteShow.animations.add('run');
            game.cacahueteShow.animations.play('run', 5, true);  
            game.cacahueteShow.scale.set(0);
            game.cacahueteShow.anchor.set(0.5); 
            tween3 = game.add.tween(game.cacahueteShow.scale).to( { x: 1, y: 1 }, 1000 , Phaser.Easing.Elastic.Out, true);
        }else{
            game.cacahueteHide = game.add.sprite(585, 290, 'hide');
        }
        game.tabEtoile = game.add.group();
        //game.bgScore = game.add.sprite(0, 0, 'decor');
        game.nbEtoile = 3;
        if(global.cacahueteEtoile == global.cacahueteMax && global.timeEtoile <= global.timeMax && global.actionEtoile<= global.actionMax){
            game.nbEtoile = 3;
        }else if(global.timeEtoile <= global.timeMax && global.actionEtoile <= global.actionMax ||
                 global.cacahueteEtoile === global.cacahueteMax && global.actionEtoile <= global.actionMax ||
                 global.timeEtoile <= global.timeMax && global.cacahueteEtoile === global.cacahueteMax){
            game.nbEtoile = 3;
        }else if(global.actionEtoile <= global.actionMax ||
                 global.timeEtoile <= global.timeMax || 
                 global.cacahueteEtoile === global.cacahueteMax){
            game.nbEtoile = 3;
        }
        console.log(global.actionEtoile)
        game.unlockLevel = {};
        game.unlockLevel.idLevel = global.idLevel;
        game.unlockLevel.nbEtoile = game.nbEtoile;
        
        for (var i = 0; i < game.nbEtoile; i++) {
            var y = i === 1 ?  20 : 80;
            var etoile = game.add.sprite(50 * i + 192 * i , y, 'etoile');

            etoile.animations.add('run');
            etoile.animations.play('run', 4, true);
            etoile.scale.set(0);
            etoile.anchor.set(0.5);
            tween = game.add.tween(etoile.scale).to( { x: 1, y: 1 }, 1000 , Phaser.Easing.Elastic.Out, true);
            game.tabEtoile.add(etoile);
            console.log(game.tabEtoile)
        };

        game.tabButton = game.add.group();
        for (var i = 0; i < 3; i++) {
            var name = i === 0 ? this.goChapter : i === 1 ? this.goRetry : this.goNext
            button = game.add.button(192 * i + 50 * i, 0,'button'+i,name);
            button.scale.set(0);
            button.anchor.set(0.5);
            game.tabButton.add(button);
            tween = game.add.tween(button.scale).to( { x: 1.2, y: 1.2 }, 1000 , Phaser.Easing.Elastic.Out, true);
        };
        game.tabEtoile.x = 1280/3.2;
        game.tabButton.x = 1280/3.2;
        game.tabEtoile.y = 100;
        game.tabButton.y = 500;
        if(tabUnlockEtoile.length >= 1){
            for (var i = 0; i < tabUnlockEtoile.length ; i++) {
                if(tabUnlockEtoile[i].idLevel !== global.idLevel){
                    game.oldTab = JSON.stringify(tabUnlockEtoile);
                        
                    //game.newTab = oldTab.replace(']','') + ","+JSON.stringify(game.unlockLevel)+"]";
                    
                    localStorage.removeItem('unlock');
                    localStorage.setItem('unlock',game.newTab);
                }                  
            };
        }else{
            tabUnlockEtoile.push(game.unlockLevel);
            localStorage.setItem('unlock',JSON.stringify(tabUnlockEtoile));
        }   
    },
    update:function(){
    },
    goChapter:function(){
        game.state.start('ChapterState')
    },
    goRetry:function(){
        new LevelState(game,idLevel);
        game.state.start('LevelState')
    },
    goNext:function(){
        global.idLevel+=1;
        new LevelState(game,global.idLevel);
        game.state.start('LevelState')
    },    
};