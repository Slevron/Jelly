var MenuState = function(game) {  }; 
MenuState.prototype = 
{
    //PRELOAD
    preload: function(){
        this.game.load.image('play','src/assets/play.png');
        this.game.load.image('option','src/assets/option.png');
        this.game.load.image('credit','src/assets/credit.png');
    },
    create: function(){
        this.game.play=this.game.add.button(1280/2,300,"play",this.goChapter);
        this.game.play.anchor.setTo(0.5,0.5);
        this.game.option=this.game.add.button(1280/2,400,"option",this.goOption);
        this.game.option.anchor.setTo(0.5,0.5);
        this.game.option=this.game.add.button(1280/2,500,"credit",this.goCredit);
        this.game.option.anchor.setTo(0.5,0.5);
    },
    update:function(){
    },
    goChapter:function(){
        game.state.start('ChapterState');
    },
    goOption:function(){
        game.state.start('OptionState');
    },
    goCredit:function(){
        game.state.start('CreditState');
    },
};