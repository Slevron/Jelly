var ChapterState = function(game) {  }; 
ChapterState.prototype = 
{
    //PRELOAD
    preload: function(){
        this.game.load.image('chapter','src/assets/chapter.png');
    },
    create: function(){
        game.button = game.add.group();
        var taille = 72;
        var offset = 70;
        var y = 0;
        for (var i = 0; i < 5; i++) {
            button = game.add.button(i * taille + i * offset , y,'chapter',this.goChapter);
            button.name = i;
            game.button.add(button);
            console.log(game.button);
        };
        game.button.x = 1280/4;
        game.button.y = 250;
    },
    update:function(){
    },
    goChapter:function(){
        new LevelState(game,this.name);
        game.state.start('LevelState')
    },
    goOption:function(){
        game.state.start('OptionState');
    },
    goCredit:function(){
        game.state.start('CreditState');
    },    
};