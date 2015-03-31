/********************************************
    JAUGE
********************************************/
function Character(game){
    this.refGame=game;
    this.sprite = game.add.sprite(32, 32, 'dude');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.jumpTimer = 0;
    this.facing = 'left'; // la direction du regard du player
    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setSize(20, 32, 5, 16);
    this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
    this.sprite.animations.add('turn', [4], 20, true);
    this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
    game.camera.follow(this.sprite);
    this.cursors = game.input.keyboard.createCursorKeys();
    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

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