var MenuState = function(game) {  }; 
MenuState.prototype = 
{
    //PRELOAD
    preload: function(){
     
        this.game.load.image('option','src/assets/option.png');
        this.game.load.image('credit','src/assets/credit.png');
        this.game.load.image('bgMenu','src/assets/decor/play.png');
        this.game.load.spritesheet('dude', 'src/assets/dude.png', 117, 131);
        this.game.load.spritesheet('ponpon', 'src/assets/ponpon.png', 117, 131);
        this.game.load.image('fur1','src/assets/poil1.png');
        this.game.load.image('fur2','src/assets/poil2.png');
        this.game.load.image('fur3','src/assets/poil3.png');
        this.game.load.image('furball','src/assets/titre/furball.png');
        this.game.load.image('spider','src/assets/titre/araignee.png');
        this.game.load.image('furball','src/assets/titre/fil.png');
        this.game.load.image('furball','src/assets/titre/toile.png');
        this.game.load.image('furball','src/assets/titre/great.png');
        this.game.load.image('furball','src/assets/titre/escape.png');
        this.game.load.atlasJSONHash('cacahuete', 'src/assets/cacahuete.png', 'src/assets/cacahuete.json');

    },
    create: function(){
        

        this.ponponSprite=game.add.sprite(0,0,'ponpon');
        this.ponponSprite.animations.add("idle",[0,1,2,3],10,true);
        this.ponponSprite.animations.play("idle");
        this.ponponSprite.anchor.setTo(0.5,0.5);

        this.cacahuete= game.add.sprite(500,game.world.height- 65, 'cacahuete');
        this.cacahuete.animations.add('run');
        this.cacahuete.animations.play('run', 5, true);
        

        this.characterInmenu= game.add.sprite(100 ,game.world.height- 58, 'dude');
        this.characterInmenu.animations.add('walk', [1, 2, 3, 4], 5, true);
        this.characterInmenu.animations.play('walk');
        this.characterInmenu.anchor.setTo(0.5,0.5);
        //this.game.play=this.game.add.button(1280/2,300,"play",this.goChapter);
        //this.game.play.anchor.setTo(0.5,0.5);
        /*this.game.option=this.game.add.button(1280/2,400,"option",this.goOption);
        this.game.option.anchor.setTo(0.5,0.5);
        this.game.option=this.game.add.button(1280/2,500,"credit",this.goCredit);
        this.game.option.anchor.setTo(0.5,0.5);*/

        this.srpiteBg=game.add.sprite(0,-2000,'bgMenu');
        this.bgTween = game.add.tween(this.srpiteBg).to({x:0,y:0}, 500, Phaser.Easing.Cubic.In,true,6000);
        this.bgTween.onComplete.add(onComplete, this);

        
        this.particles = game.add.emitter(0, 0, 250);
        this.particles.makeParticles(['fur1','fur2','fur3']);
        //this.particles.body.setSize(10,10,0,0);
        this.particles.minParticleSpeed.setTo(-200, -300);
        this.particles.maxParticleSpeed.setTo(200, -400);
        this.particles.angularDrag=30;
    },
    update:function(){
        this.ponponSprite.x=this.characterInmenu.x;
        this.ponponSprite.y=this.characterInmenu.y;
        this.characterInmenu.x+=1;
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
function onComplete(){
        this.particles.x=this.characterInmenu.x
        this.particles.y=this.characterInmenu.y+200
        this.ponponSprite.destroy();
        this.characterInmenu.destroy();
        this.particles.start(true,10000, 10, 50);
}