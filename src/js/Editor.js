function Editor(game,callback,callback2){
    this.refGame = game;
    this.dude = game.add.button(0, 30,'dude',callback);
    this.dude.scale.setTo(0.5);
    this.roach = game.add.button(70, 30,'roach',callback);
    this.roach.scale.setTo(0.5);
    this.spider = game.add.button(70 * 2, 30,'spider',callback);
    this.spider.scale.setTo(0.5);
    this.worm = game.add.button(70 * 3, 30,'worm',callback);
    this.worm.scale.setTo(0.5);
    this.cacahuete = game.add.button(70 * 4, 30,'cacahuete',callback);
    this.cacahuete.scale.setTo(0.5);

    this.callbackDrag = callback2;
};
Editor.prototype.constructor = Editor;
Editor.prototype.update = function(){
    if (game.input.activePointer.isDown && game.editorSprite !== null)
    {
        sprite = game.add.sprite(game.input.x, game.input.y, game.editorSprite);
        sprite.inputEnabled = true;
        sprite.input.enableDrag();
        sprite.events.onDragStop.add(this.callbackDrag, this);
        game.editorSprite = null;
    }
};

