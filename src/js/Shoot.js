/********************************************
    JAUGE
********************************************/
function Shoot(game,posx,posy,dir){
    this.refGame = game;
    
    this.sprite = game.shoots.create(posx, posy, 'starBig');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.allowGravity = false;
    this.sprite.scale = game.character.sprite.scale;

    this.speed = 10;

    this.direction = dir;
    this.sprite.scale = game.character.sprite.scale;

    this.sprite.anchor.set(0.5,0.5);
    this.sprite.scale = {x:0,y:0};
    
    game.add.tween(this.sprite.scale).to({x:1,y:1}, 500, Phaser.Easing.Cubic.Out,true);

    this.sprite.body.setSize(this.sprite.body.width*0.4,this.sprite.body.height*0.4,30*dir);

};
Shoot.prototype.constructor = Character;
Shoot.prototype.update = function(){
   this.sprite.rotation += 0.1;
   this.move();
};
Shoot.prototype.move = function(){
    this.sprite.x += this.speed * this.direction;
};