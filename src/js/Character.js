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
    this.sprite.animations.add('walk', [1, 2, 3, 4], 10, true);
    this.sprite.animations.add('jump', [0], 10, true);
    this.sprite.animations.add('idle',[5],10,true);
    this.sprite.animations.add('hurt',[7,8,9,10,11,6],20,true);

    this.sprite.frame=5;
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
    
    this.move();

};
Character.prototype.move =function(){
    
     if(this.canInput)
    {
        this.sprite.body.velocity.x=0;
         if (this.cursors.left.isDown){

        this.state="walk";
        this.sprite.body.velocity.x = -250;
        this.sprite.scale={x:-this.scaleBase,y:this.scaleBase};
    }
        if (this.cursors.right.isDown){
            this.state="walk";
            this.sprite.body.velocity.x = 250;
            this.sprite.scale={x:this.scaleBase,y:this.scaleBase};
        }
        if (this.jumpButton.isDown && this.sprite.body.onFloor() && this.refGame.time.now > this.jumpTimer)
        {
            this.state="isJumping";
            this.sprite.body.velocity.y = -800;
            this.jumpTimer = this.refGame.time.now + 750;   
        }
        else if(this.sprite.body.onFloor()&& this.state!="walk")
        {
            this.state="idle";
            this.jumpTimer=0;
        }
        else if(!this.sprite.body.onFloor())
        {
            this.state="jump"; 
        }
    }
   
    
        
 
    //---------------SHOOT.
    if(this.shootButton.isDown&& this.canshoot&&this.state!="hurt")
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
    console.log(this.state);
    
    this.checkStateForAnim(this.state);
};
Character.prototype.launchShoot = function(){
   global.actionEtoile+=1;
   this.shoots.push(new Shoot(this.refGame,this.sprite.x,this.sprite.y-this.sprite.height*70/100,this.sprite.scale.x));
   this.takeDamage(0.04);
   this.canInput=true;
};
Character.prototype.takeDamage = function(damage){
     this.state="hurt";
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
Character.prototype.checkStateForAnim= function(state){
  if(this.sprite.frame<7)
    this.sprite.animations.play(state);

};