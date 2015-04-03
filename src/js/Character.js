function Character(game,x,y){
    this.refGame=game;
    this.sprite = game.add.sprite(x, y, 'dude');
    
    this.sprite.refThis = this;
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.particles = game.add.emitter(game.world.centerX, game.world.centerY, 250);
    this.particles.makeParticles(['fur1','fur2','fur3']);
    //this.particles.body.setSize(10,10,0,0);
    this.particles.minParticleSpeed.setTo(-200, -300);
    this.particles.maxParticleSpeed.setTo(200, -400);
    this.particles.gravity=0;
    this.particles.angularDrag=30;
    console.log(this.particles);    

    //this.particle.start(false, 8000, 400);
    this.jumpTimer = 0;
    this.facing = 'left'; // la direction du regard du player
    this.sprite.body.bounce.y = 0;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setSize(80, 90,4,16);
    this.sprite.animations.add('walk', [1, 2, 3, 4], 10, true);
    this.sprite.animations.add('jump', [0], 10, true);
    this.sprite.animations.add('idle',[5],10,true);
    this.sprite.animations.add('hurt',[7,8,9,10,11,6],20,true);
    var anim = this.sprite.animations.add('death',[12,13,14,16],20,false);
    anim.onComplete.add(this.kill,this);
    this.newScale={x:0,y:0};
    this.sprite.frame=5;
    this.minimumlife=0.5;
    this.safeOnTime=true;//save l'ennemi lorsqu'il s'apprete a mourir une fois, permet de passer en alerte
    //ponpon
    this.ponponSprite=game.add.sprite(this.sprite.x,this.sprite.y,'ponpon');
    this.ponponSprite.animations.add("idle",[0,1,2,3],10,true);
    this.ponponSprite.animations.add("shoot",[4,5,6,7,3],10,true);
    this.ponponSprite.anchor.set(0.5,0.5);
    this.sprite.bringToTop();
    //this.sprite.animations.add('turn', [4], 20, true);
    //this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
    game.camera.follow(this.sprite, Phaser.Camera.FOLLOW_PLATFORMER);
    this.cursors = game.input.keyboard.createCursorKeys();
    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.shootButton=  game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.lastInput;
    this.shoots= [];
    this.canshoot=true;
    this.hitable = true;
    this.timeSinceHit = 0;
    this.invicibleTime = 0.7;
    this.health = 1;
    this.scaleBase=1;
    this.canInput=true;
    this.alive = true;
    this.distanceJump=-800;
};
Character.prototype.constructor = Character;
Character.prototype.update = function(){
    if(!this.alive){
        return;
    }
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
    this.particlesUpdate();
    game.physics.arcade.collide(this.particles, this.refGame.map.layer);
    this.move();
    this.ponponUpdate();
};
Character.prototype.move =function(){
     this.ponponSprite.scale=this.sprite.scale;
     if(this.canInput)
    {
        this.sprite.body.velocity.x=0;
        if (this.cursors.left.isDown&&!this.cursors.right.isDown){
            if(this.ponponSprite.frame<4)
                this.jumpTimer=0;
            this.ponponSprite.animations.play("idle");
            this.state="walk";
            this.lastInput=250
            this.sprite.body.velocity.x = -250;
            this.sprite.scale={x:-this.scaleBase,y:this.scaleBase};
        }
        else if (this.cursors.right.isDown&&!this.cursors.left.isDown){
            this.state="walk";

            if(this.ponponSprite.frame<4)
                this.jumpTimer=0;
          this.ponponSprite.animations.play("idle");
            this.lastInput=-250;
            this.sprite.body.velocity.x = 250;
            this.sprite.scale={x:this.scaleBase,y:this.scaleBase};
        }
        else if(this.cursors.right.isDown&&this.cursors.left.isDown){
            this.sprite.body.velocity.x =this.lastInput;
        }

        if (this.jumpButton.isDown && this.sprite.body.onFloor() && this.refGame.time.now > this.jumpTimer)
        {
            this.ponponSprite.frame=0;
            this.state="isJumping";
            this.sprite.body.velocity.y = this.distanceJump;
            this.jumpTimer = this.refGame.time.now + 750;   
        }
        else if((this.sprite.body.onFloor()&& this.state!="walk")||(!this.cursors.right.isDown&&!this.cursors.left.isDown)&&this.sprite.body.onFloor())
        {
            this.ponponSprite.frame=0;
            this.state="idle";
            
            this.jumpTimer=0;
        }
        else if(!this.sprite.body.onFloor())
        {
            this.ponponSprite.frame=0;
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
    
      this.checkStateForAnim(this.state);
      this.checkStateForAnim(this.state);
      if(this.sprite.body.velocity.y > 700)
      {
        this.sprite.body.velocity.y= 600;
      }
   
};
Character.prototype.launchShoot = function(){
   var dir;
   global.actionEtoile+=1;
   this.shoots.push(new Shoot(this.refGame,this.sprite.x,this.sprite.y-this.sprite.height*30/100,this.sprite.scale.x));
   this.shoots[this.shoots.length-1].indexArray = this.shoots.length-1;
   this.takeDamage(0.1);
   this.canInput=true;
    var gotween = game.add.tween(this.ponponSprite).to({rotation : (dir= this.sprite.scale.x > 0 ? 1 : -1)}, 100, Phaser.Easing.Cubic.Out,true).yoyo(true, 0)
    gotween.onComplete.add(replace,this)
};
Character.prototype.takeDamage = function(damage){

    
    this.particles.start(true, 1000, 10, 5);
    this.state="hurt";
    this.ponponSprite.animations.play("shoot");
    this.health -= damage;
    this.hitable = false;
    this.timeSinceHit = 0; 
    this.canInput=false; 
   var dir=0;
   this.scaleBase -= this.scaleBase*damage;
   this.newScale.x=this.scaleBase* (dir= this.sprite.scale.x > 0 ? 1 : -1);
   this.newScale.y=this.scaleBase* (dir= this.sprite.scale.y > 0 ? 1 : -1); 
   game.add.tween(this.sprite.scale).to({x:this.newScale.x,y:this.newScale.y}, 1000, Phaser.Easing.Cubic.Out,true);
   game.add.tween(this.ponponSprite.scale).to({x:this.newScale.x,y:this.newScale.y}, 1000, Phaser.Easing.Cubic.Out,true);
   this.sprite.body.offset.x *= this.newScale.x;
   this.sprite.body.offset.y = 16 * this.newScale.y;
    
   if(this.distanceJump<-520)
   {
    this.distanceJump+=40;
   }

   console.log(this.distanceJump)
   if(Math.abs(this.sprite.scale.x) < 0.4)
    {
        if(!this.safeOnTime)
        {
            this.state="death";
        }
        else{

            this.safeOnTime=false;
            this.sprite.scale={x:0.41,y:0.41};
        }
    } 
};
Character.prototype.ponponUpdate = function(){
    this.ponponSprite.x=this.sprite.x;
    this.ponponSprite.y=this.sprite.y;

};
Character.prototype.checkStateForAnim= function(state){
  
  if(this.sprite.frame<7){
    this.sprite.animations.play(state);
    }

};
Character.prototype.kill = function(){
    this.sprite.destroy();
    this.ponponSprite.destroy();
    this.alive = false;
}
 function replace(){
  game.character.ponponSprite.rotation=0;
}
Character.prototype.particlesUpdate= function()
{
    this.particles.x =this.sprite.x;
    this.particles.y =this.sprite.y;
}
