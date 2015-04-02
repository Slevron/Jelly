function Character(game){
    this.refGame = game;
    //Sprite
    this.sprite = game.add.sprite(470, 135, 'dude');
    this.sprite.frame=5;
    this.sprite.refThis = this;
    this.sprite.anchor.setTo(0.5,0.5);
    //Physics
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.bounce.y = 0;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setSize(80, 90,4,16);
    //Animations
    this.sprite.animations.add('walk', [1, 2, 3, 4], 10, true);
    this.sprite.animations.add('jump', [0], 10, true);
    this.sprite.animations.add('idle',[5],10,true);
    this.sprite.animations.add('hurt',[7,8,9,10,11,6],20,true);
    this.sprite.animations.add('death',[12,13,14,16],20,true);

    //Ponpon
    this.ponponSprite = game.add.sprite(this.sprite.x,this.sprite.y,'ponpon');
    this.ponponSprite.animations.add("idle",[0,1,2,3],10,true);
    this.ponponSprite.animations.add("shoot",[4,5,6,7,3],10,true);
    this.ponponSprite.anchor.set(0.5,0.5);
    //Met le ponpon derrière
    this.sprite.bringToTop();

    //this.sprite.animations.add('turn', [4], 20, true);
    //this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
    //Camera
    game.camera.follow(this.sprite, Phaser.Camera.FOLLOW_PLATFORMER);
    //Inputs
    this.canInput = true;
    this.cursors = game.input.keyboard.createCursorKeys();
    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.shootButton=  game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.lastInput;


    //VARIABLES
    //Health
    this.health = 1;
    this.minimumlife = 0.5;
    //Invulnerabilité
    this.hitable = true;
    this.safeOnTime = true;//save l'ennemi lorsqu'il s'apprete a mourir une fois, permet de passer en alerte
    this.invicibleTime = 0.7;
    this.timeSinceHit = 0;
    //Scale
    this.scaleBase = 1;
    this.newScale = {x:0,y:0};
    //Shoots
    this.canshoot = true;
    this.shoots = [];
    //Jump
    this.jumpTimer = 0;
    //Facing
    this.facing = 'left'; // la direction du regard du player

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

    this.ponponUpdate();
};

Character.prototype.move =function(){
    this.ponponSprite.scale = this.sprite.scale;
    if(this.canInput){
        //Reinit velocity
        this.sprite.body.velocity.x = 0;
        //Idle
        if(this.cursors.left.isDown && !this.cursors.right.isDown){
            if(this.ponponSprite.frame<4)
            this.ponponSprite.animations.play("idle");
            this.state="walk";
            this.lastInput=250
            this.sprite.body.velocity.x = -250;
            this.sprite.scale={x:-this.scaleBase,y:this.scaleBase};
        }
        //Go Right
        else if (this.cursors.right.isDown&&!this.cursors.left.isDown){
            this.state="walk";

            if(this.ponponSprite.frame<4)
                this.ponponSprite.animations.play("idle");

            this.lastInput = -250;
            this.sprite.body.velocity.x = 250;
            this.sprite.scale = {x:this.scaleBase,y:this.scaleBase};
        }
        //Go Left
        else if(this.cursors.right.isDown && this.cursors.left.isDown){
            this.sprite.body.velocity.x = this.lastInput;
        }

        //Jump
        if (this.jumpButton.isDown && this.sprite.body.onFloor() && this.refGame.time.now > this.jumpTimer){
            this.ponponSprite.frame = 0;
            this.state = "isJumping";
            this.sprite.body.velocity.y = -800;
            this.jumpTimer = this.refGame.time.now + 750;   
        }
        //Go idle anim
        else if( (this.sprite.body.onFloor() && this.state != "walk") || (!this.cursors.right.isDown && !this.cursors.left.isDown) && this.sprite.body.onFloor() ){
            this.ponponSprite.frame = 0;
            this.state = "idle";
            this.jumpTimer = 0;
        }
        //Jump anim
        else if(!this.sprite.body.onFloor()){
            this.ponponSprite.frame = 0;
            this.state = "jump"; 
        }
    }
    
    //---------------SHOOT.
    if(this.shootButton.isDown && this.canshoot && this.state != "hurt"){
        this.launchShoot();   
    }
    if(this.shootButton.isDown){
        this.canshoot = false;
    }
    if(this.shootButton.isUp){
        this.canshoot = true;
    }
    
    this.checkStateForAnim(this.state);
    //this.checkStateForAnim(this.state);
};

Character.prototype.launchShoot = function(){
   var dir;
   global.actionEtoile+=1;

   this.shoots.push(new Shoot(this.refGame,this.sprite.x,this.sprite.y-this.sprite.height*30/100,this.sprite.scale.x));
   this.takeDamage(0.1);
   this.canInput=true;

    var gotween = game.add.tween(this.ponponSprite).to({rotation : (dir= this.sprite.scale.x > 0 ? 1 : -1)}, 100, Phaser.Easing.Cubic.Out,true).yoyo(true, 0);
    gotween.onComplete.add(replace,this);
};

Character.prototype.takeDamage = function(damage){
    this.state = "hurt";
    this.ponponSprite.animations.play("shoot");
    this.health -= damage;
    this.hitable = false;
    this.timeSinceHit = 0; 
    this.canInput = false;
   
    var dir = 0;

    this.scaleBase -= this.scaleBase*damage;
    this.newScale.x = this.scaleBase* (dir = this.sprite.scale.x > 0 ? 1 : -1);
    this.newScale.y = this.scaleBase* (dir = this.sprite.scale.y > 0 ? 1 : -1); 

    game.add.tween(this.sprite.scale).to({x:this.newScale.x,y:this.newScale.y}, 1000, Phaser.Easing.Cubic.Out,true);
    game.add.tween(this.ponponSprite.scale).to({x:this.newScale.x,y:this.newScale.y}, 1000, Phaser.Easing.Cubic.Out,true);

    this.sprite.body.offset.x *= this.newScale.x;
    this.sprite.body.offset.y = 16 * this.newScale.y;

    if(Math.abs(this.sprite.scale.x) < 0.4){
        if(!this.safeOnTime){
            this.state = "death";
        }
        else{
            this.safeOnTime = false;
            this.sprite.scale = {x:0.41,y:0.41};
        }
    } 
};

Character.prototype.ponponUpdate = function(){
    this.ponponSprite.x = this.sprite.x;
    this.ponponSprite.y = this.sprite.y;
};

Character.prototype.checkStateForAnim= function(state){
    if(this.sprite.frame < 7){
        this.sprite.animations.play(state);
    }
};

function replace(){
  game.character.ponponSprite.rotation=0;
}