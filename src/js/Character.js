function Character(game){
    this.refGame=game;
    this.sprite = game.add.sprite(470, 135, 'dude');
    this.sprite.anchor.setTo(0.5,0.5);
    this.sprite.refThis = this;
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.jumpTimer = 0;
    this.facing = 'left'; // la direction du regard du player
    this.sprite.body.bounce.y = 0;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setSize(80, 90,4,16);
    this.sprite.animations.add('left', [1, 2, 3, 4], 10, true);
    this.sprite.animations.add('jump', [0], 10, true);
    //this.sprite.animations.add('turn', [4], 20, true);
    //this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
    game.camera.follow(this.sprite, Phaser.Camera.FOLLOW_PLATFORMER);
    this.cursors = game.input.keyboard.createCursorKeys();
    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.shootButton=  game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.shoots= [];
    this.canshoot=true;
    this.hitable = true;
    this.timeSinceHit = 0;
    this.invicibleTime = 3;
    this.health = 1;
    this.scaleBase=1;
    this.canInput=true;
    console.log(this.sprite);
};
Character.prototype.constructor = Character;
Character.prototype.update = function(){
    if(this.hitable == false){
        this.timeSinceHit += this.refGame.time.deltaTime;
        if(this.timeSinceHit >= this.invicibleTime){
            this.hitable = true;
            this.canInput=true;

        }
    }
    for (var i = 0; i < this.shoots.length; i++) {
       this.shoots[i].update();
    };
    if(this.canInput)
    this.move();

};
Character.prototype.move =function(){
    this.sprite.body.velocity.x=0;
    
    if (this.cursors.left.isDown){
        this.sprite.body.velocity.x = -250;
        if (this.facing != 'left')
        {
            this.sprite.animations.play('left');
            this.facing = 'left';
            this.sprite.scale={x:-this.scaleBase,y:this.scaleBase};    
        }
    }
    else if (this.cursors.right.isDown)
    {
        this.sprite.body.velocity.x = 250;
        if (this.facing != 'right')
        {
            this.sprite.animations.play('left');
            this.facing = 'right';
            this.sprite.scale={x:this.scaleBase,y:this.scaleBase};
        }
    }

    if (this.jumpButton.isDown && this.sprite.body.onFloor() && this.refGame.time.now > this.jumpTimer)
    {
        this.sprite.body.velocity.y = -800;
        this.jumpTimer = this.refGame.time.now + 750;   
    }
    else if(this.sprite.body.onFloor())
    {
        this.jumpTimer=0;
    }


    if(this.sprite.body.onFloor()&&!this.cursors.right.isDown&&!this.cursors.left.isDown)
    {
        if(this.sprite.body.onFloor()){
            if (this.facing != 'idle')
            {
                this.sprite.animations.stop();
                if (this.facing == 'left')
                {
                    this.sprite.frame = 5;
                }
                else
                {   
                   this.sprite.frame = 5;
                }   
                this.facing = 'idle';
            }

        }
    }
    else if(!this.sprite.body.onFloor())
    {
       this.sprite.animations.play('jump');
    }
    else if(this.sprite.body.onFloor&&(this.cursors.right.isDown||this.cursors.left.isDown)){
        this.sprite.animations.play("left")
    }

    


    //---------------SHOOT.
    if(this.shootButton.isDown&& this.canshoot)
    {
        this.launchShoot();
    }        
    if(this.shootButton.isDown)
    {
        this.canshoot=false;
    }
    if(this.shootButton.isUp)
    {
        this.canshoot=true;
    }
};
Character.prototype.launchShoot = function(){
   
   global.actionEtoile+=1;

   this.shoots.push(new Shoot(this.refGame,this.sprite.x,this.sprite.y-this.sprite.height*70/100,this.sprite.scale.x));
   this.takeDamage(0.04);
   this.canInput=true;
};
Character.prototype.takeDamage = function(damage){
    this.health -= damage;
    this.hitable = false;
    this.timeSinceHit = 0; 
    this.canInput=false;
   var newScale={x:0,y:0};
   var dir=0;
   this.scaleBase -= this.scaleBase*damage;
   newScale.x=this.scaleBase* (dir= this.sprite.scale.x > 0 ? 1 : -1);
   newScale.y=this.scaleBase* (dir= this.sprite.scale.y > 0 ? 1 : -1); 

   game.add.tween(this.sprite.scale).to({x:newScale.x,y:newScale.y}, 1000, Phaser.Easing.Cubic.Out,true);
   this.sprite.body.offset.x *= newScale.x;
   this.sprite.body.offset.y = 16 * newScale.y;
};