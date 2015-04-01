var ScoreState = function(game) {  }; 
ScoreState.prototype = 
{
    //PRELOAD
    preload: function(){
        this.game.load.image('etoile','src/assets/etoile.png');
        this.game.load.image('button0','src/assets/chapter.png');
        this.game.load.image('button1','src/assets/chapter.png');
        this.game.load.image('button2','src/assets/chapter.png');
    },
    create: function(){
        game.tabEtoile = game.add.group();
        game.nbEtoile = 0;
        if(global.cacahueteEtoile == global.cacahueteMax && global.timeEtoile === global.timeMax && global.actionEtoile === global.actionMax){
            game.nbEtoile = 3;
        }else if(global.timeEtoile === global.timeMax && global.actionEtoile === global.actionMax){
            game.nbEtoile = 2;
        }else if(global.actionEtoile === global.actionMax){
            game.nbEtoile = 1;
        }
        game.unlockLevel = {};
        game.unlockLevel.idLevel = global.idLevel;
        game.unlockLevel.nbEtoile = game.nbEtoile;
        
        for (var i = 0; i < game.nbEtoile; i++) {
            var y = i === 1 ?  50 : 0;
            etoile = game.add.sprite(128 * i + 50 * i, y, 'etoile');
            etoile.scale.set(0);
            etoile.anchor.set(0.5);
            tween = game.add.tween(etoile.scale).to( { x: 1, y: 1 }, 1000 , Phaser.Easing.Elastic.Out, true);
            game.tabEtoile.add(etoile);
        };
        game.tabButton = game.add.group();
        for (var i = 0; i < 3; i++) {
            var name = i === 0 ? this.goChapter : i === 1 ? this.goRetry : this.goNext
            button = game.add.button(128 * i + 50 * i, 0,'button'+i,name);
            button.scale.set(0);
            button.anchor.set(0.5);
            game.tabButton.add(button);
            tween = game.add.tween(button.scale).to( { x: 1, y: 1 }, 1000 , Phaser.Easing.Elastic.Out, true);
        };
        game.tabEtoile.x = 1280/2.9;
        game.tabButton.x = 1280/2.9;
        game.tabEtoile.y = 100;
        game.tabButton.y = 500;
        if(tabUnlockEtoile.length > 0){
            for (var i = 0; i < tabUnlockEtoile.length ; i++) {
                if(tabUnlockEtoile[i].idLevel !== idLevel){
                    game.oldTab = JSON.stringify(tabUnlockEtoile);
                        
                    game.newTab = oldTab.replace(']','') + ","+JSON.stringify(game.unlockLevel)+"]";
                    
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
        idLevel+=1;
        new LevelState(game,idLevel);
        game.state.start('LevelState')
    },    
};