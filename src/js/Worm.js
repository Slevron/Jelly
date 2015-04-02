function Worm (game,x,y,waypoints){
	Enemy.call(this,game);
	this.sprite = game.enemies.create(x,y,"worm",0);
	this.sprite.refThis = this;
	this.sprite.anchor.set(0.5);
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.setSize(this.sprite.body.width,this.sprite.body.height*0.5)

	this.sprite.animations.add('walk', [1, 2, 3, 4], 10, true);
    

	this.speed = 100;

	this.waypoints = [];
	for(var i = 0; i < waypoints.length; i++) {
		this.waypoints[i] = {x:this.sprite.x,y:this.sprite.y};
		this.waypoints[i].x += waypoints[i].x;
	}

	this.nextWaypoint = 0;

	this.exploding = false;
	this.sprite.animations.play("walk");
};
Worm.prototype = Object.create(Enemy.prototype);
Worm.prototype.constructor = Worm;
Worm.prototype.update = function () {
	//
	if (this.playerInSight()){
		console.log("BOOOOOOM")
		this.startExploding();
		//return;
	}
	else{
		if(this.checkIfWaypointReached()){
			this.changeToNextWaypoint();
		}
		this.moveToNextWaypoint();
	}
	return;
};
Worm.prototype.move = function (dir) {
	/*if(dir == "left"){
		this.sprite.x -= this.speed * this.refGame.time.deltaTime;
	}
	else if (dir == "right"){
		this.sprite.x += this.speed * this.refGame.time.deltaTime;
	}*/
	return;
};
Worm.prototype.checkIfWaypointReached = function () {
	//
	var waypoint = this.waypoints[this.nextWaypoint];

	if((this.sprite.x >= waypoint.x + 6)      // trop à droite

	    || (this.sprite.x + this.sprite.width <= waypoint.x) // trop à gauche

	    || (this.sprite.y >= waypoint.y + 32) // trop en bas

	    || (this.sprite.y + this.sprite.height <= waypoint.y)){
		return false;
	}
	else{
		return true;
	}
};
Worm.prototype.changeToNextWaypoint = function () {
	this.nextWaypoint++;
	if(this.nextWaypoint >= this.waypoints.length){
		this.nextWaypoint = 0;
	}
	return;
};
Worm.prototype.moveToNextWaypoint = function () {
	//
	var waypoint = this.waypoints[this.nextWaypoint];
	
	if (this.sprite.x > waypoint.x){

		//Left
		if (this.facing == "right") {
			this.changeFacing("left");
		}
		this.move("left");
	}
	else {
		//Right
		if (this.facing == "left") {
			this.changeFacing("right");
		}
		this.move("right");
	}

	if(this.currentState != "Move"){
		this.changeCurrentState("Move");
	}
	return;
};
Worm.prototype.moveToPlayer = function () {
	//
	if(this.x > this.refGame.character.sprite.x+(this.refGame.character.sprite.width*0.5)){
		//Move left
		this.move("left");
	}
	else {
		//Move right
		this.move("right");
	}
	return;
};
Worm.prototype.playerInSight = function () {
    if(this.refGame.physics.arcade.distanceBetween(this.sprite,this.refGame.character.sprite) < 300){
    	return true;
    }
};
Worm.prototype.startExploding = function () {
	//Create explosion
	this.refGame.explosions.push(new Explosion(this.refGame,this.sprite,1));
	this.exploding = true;
	this.kill();
};

function Explosion(game,spriteWorm,timeBeforeEndExplode){
	this.sprite = game.add.sprite(spriteWorm.x,spriteWorm.y,"worm");
	this.sprite.anchor.set(0.5,0.5);
	this.sprite.x = spriteWorm.x;
	this.sprite.y = spriteWorm.y;
	this.sprite.animations.add('explosion', [5,6,7,8,9,10,11,12], 10, true);
	this.timeBeforeEndExplode = timeBeforeEndExplode;
	this.update = function(){
		this.sprite.scale.x *= 1.02;
		this.sprite.scale.y *= 1.02;
		game.physics.arcade.overlap(this.sprite, game.character,function(spriteOver,characterOver){
			if(characterOver.refThis.hitable){
                if(spriteOver.x > characterOver.x+(characterOver.width*0.5)){
                    //right so bounce left
                    characterOver.body.velocity.x = -1200;
                    characterOver.body.velocity.y = -300;
                }
                else{
                        //left so bounce right
                    characterOver.body.velocity.x = 1200;
                    characterOver.body.velocity.y = -300;
                }
                characterOver.refThis.takeDamage(0.1);
            }
		});

		this.timeBeforeEndExplode -= game.time.deltaTime;
		if(this.timeBeforeEndExplode <= 0){
			return true;
		}
		return false;
	};
	this.sprite.animations.play("explosion");

};