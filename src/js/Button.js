function Button(game,x,y){
    this.refGame=game;
    console.log(game);
    this.x = x;
    this.y = y;
    game.add.button(this.x, this.y,'chapter',this.goChapter)
};
Button.prototype.constructor = Button;