/********************************************
    JAUGE
********************************************/
function Shoot(game,posx,posy,dir){
    console.log("dfdsfsdfdfsfd")
    this.refGame=game;
    this.sprite = game.add.sprite(posx, posy, 'starBig');
    this.speed = 10;
    this.direction=dir
};
Shoot.prototype.constructor = Character;
Shoot.prototype.update = function(){
   this.move();
};
Shoot.prototype.move =function(){
    if(this.direction>0)
    {
        this.sprite.x += this.speed;
    }
    if(this.direction<0)
    {
        this.sprite.x += -this.speed;
    }
     
};