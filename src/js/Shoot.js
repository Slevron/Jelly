/********************************************
    JAUGE
********************************************/
function Shoot(game,posx,posy){

    this.refGame=game;
    this.sprite = game.add.sprite(posx, posy, 'starBig');
    this.speed = 10;
};
Shoot.prototype.constructor = Character;
Shoot.prototype.update = function(){
   this.move();
};
Shoot.prototype.move =function(){
    this.sprite.x +=this.speed;
     
};