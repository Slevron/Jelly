/********************************************
    JAUGE
********************************************/
function Shoot(game,posx,posy,dir){
    this.refGame = game;
    
    this.sprite = game.shoots.create(posx, posy, 'starBig');
    this.sprite.refThis= this;
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.allowGravity = false;
    this.sprite.body.setSize(this.sprite.body.width*0.2,this.sprite.body.height*0.2,30*dir);
    this.sprite.scale = game.character.sprite.scale;
    this.sprite.outOfBoundsKill = true;

    this.speed = 800;

    this.direction = dir;
    this.sprite.scale = game.character.sprite.scale;

    this.sprite.anchor.set(0.5,0.5);
    this.sprite.scale = {x:0,y:0};
    
    game.add.tween(this.sprite.scale).to({x:1,y:1}, 500, Phaser.Easing.Cubic.Out,true);
};
Shoot.prototype.constructor = Character;
Shoot.prototype.update = function(){
   this.sprite.rotation += 0.1;
   this.move();
};
Shoot.prototype.move = function(){
    var dir = 0;
    if(this.direction > 0)
        dir = 1;
    if(this.direction < 0)
        dir = -1;
    this.sprite.body.velocity.x = this.speed * dir;
};