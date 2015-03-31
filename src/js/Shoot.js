/********************************************
    JAUGE
********************************************/
function Shoot(game){

    this.refGame=game;
    this.sprite = game.add.sprite(32, 32, 'shoot');

};
Character.prototype.constructor = Character;
Character.prototype.update = function(){

   this.move();
};
Character.prototype.move =function(){
    this.sprite.body.velocity.x=0;
    
     if (this.cursors.left.isDown)
     {
        console.log("----MOVE OK---")
        this.sprite.body.velocity.x = -150;
        if (this.facing != 'left')
        {
            this.sprite.animations.play('left');
            this.facing = 'left';
        }
    }
    else if (this.cursors.right.isDown)
    {
        this.sprite.body.velocity.x = 150;

        if (this.facing != 'right')
        {
            this.sprite.animations.play('right');
            this.facing = 'right';
        }
    }
    else
    {
        if (this.facing != 'idle')
        {
            this.sprite.animations.stop();

            if (this.facing == 'left')
            {
                this.sprite.frame = 0;
            }
            else
            {   
               this.sprite.frame = 5;
            }   
             this.facing = 'idle';
        }
    }
    if (this.jumpButton.isDown && this.sprite.body.onFloor() && this.refGame.time.now > this.jumpTimer)
    {

        this.sprite.body.velocity.y = -250;
        this.jumpTimer = this.refGame.time.now + 750;
    }

        
};