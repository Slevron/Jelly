/********************************************
    JAUGE
********************************************/
function Shoot(game,posx,posy,dir){
    this.refGame=game;
    
    this.sprite = game.shoots.create(posx, posy, 'starBig');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.allowGravity = false;
    this.sprite.scale=game.character.sprite.scale;

    this.speed = 10;
    this.direction=dir;
};
Shoot.prototype.constructor = Character;
Shoot.prototype.update = function(){
   this.move(); 
};
Shoot.prototype.move =function(){
    if(this.direction>0)
    {
        this.direction=1;
        this.sprite.x += this.speed;
    }
    if(this.direction<0)
    {
        this.direction=-1;
        this.sprite.x += -this.speed;
    }
     
};