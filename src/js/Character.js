function Character(game){
    this.refGame=game;
    this.sprite = game.add.sprite(470, 135, 'dude');
    this.sprite.anchor.setTo(0.5,0.5);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.jumpTimer = 0;
    this.facing = 'left'; // la direction du regard du player
    this.sprite.body.bounce.y = 0;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setSize(80, 90, 4, 16);
    this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
    //this.sprite.animations.add('turn', [4], 20, true);
    //this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
    game.camera.follow(this.sprite);
    this.cursors = game.input.keyboard.createCursorKeys();
    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.shoots= [];

};
Character.prototype.constructor = Character;
Character.prototype.update = function(){
   this.move();
   for (var i = 0; i < this.shoots.length; i++) {
       this.shoots[i].update();
   };
   
};
Character.prototype.move =function(){
    this.sprite.body.velocity.x=0;
    
    if (this.cursors.left.isDown){
        this.sprite.body.velocity.x = -150;
        if (this.facing != 'left')
        {
            this.sprite.animations.play('left');
            this.facing = 'left';
            //this.sprite.scale={x:-1,y:1};    
        }
    }
    else if (this.cursors.right.isDown)
    {
        this.sprite.body.velocity.x = 150;
        if (this.facing != 'right')
        {
            this.sprite.animations.play('left');
            this.facing = 'right';
            //this.sprite.scale={x:1,y:1};
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
        this.sprite.body.velocity.y = -800;
        this.jumpTimer = this.refGame.time.now + 750;
        this.launchShoot();
    }        
};
Character.prototype.launchShoot = function(){

   this.shoots.push(new Shoot(this.refGame,this.sprite.x,this.sprite.y));
};