/********************************************
    JAUGE
********************************************/
function Shoot(game){

    this.refGame=game;
    this.sprite = game.add.sprite(32, 32, 'star2.png');

};
Shoot.prototype.constructor = Character;
Shoot.prototype.update = function(){
   this.move();
};
Shoot.prototype.move =function(){
    this.sprite.x +=0.5;
     
};