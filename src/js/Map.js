function Map(game,id){
    this.refGame=game;
    console.log(game);
    this.id = id;
    this.map = game.add.tilemap('level'+id);
    this.map.addTilesetImage('tiles-1');
    this.map.setCollisionByExclusion([ 0 ]);
    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();
};
Map.prototype.constructor = Map;
