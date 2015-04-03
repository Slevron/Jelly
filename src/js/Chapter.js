var ChapterState = function(game) {  }; 
ChapterState.prototype = 
{
    //PRELOAD
    preload: function(){
        this.game.load.image('button0','src/assets/bouton/carton1.png');
        this.game.load.image('button1','src/assets/bouton/carton2.png');
        this.game.load.image('button2','src/assets/bouton/carton3.png');
        this.game.load.image('button3','src/assets/bouton/carton4.png');
        this.game.load.image('button4','src/assets/bouton/carton5.png');
        this.game.load.image('bg','src/assets/decor/credit.png');
    },
    create: function(){
        game.add.sprite(0,0,'bg');
        game.button = game.add.group();
        var taille = 170;
        var offset = 70;
        var y = 0;
        for (var i = 0; i < 5; i++) {
            button = game.add.button(i * taille + i * offset , y,'button'+i+'',this.goChapter);
            button.name = i;
            game.button.add(button);
            console.log(game.button);
        };
        game.button.x = 70;
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