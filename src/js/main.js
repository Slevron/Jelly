window.addEventListener("load",init);
function init()
{
  game = new Phaser.Game(1280, 700, Phaser.AUTO, '');
  game.state.add('MenuState' ,MenuState);
  //game.state.add('QuitState' ,QuitState);
  game.state.add('LevelState' ,LevelState);
  game.state.add('ChapterState' ,ChapterState);
  game.state.add('ScoreState' ,ScoreState);
  //on lance le mainmenu
  game.state.start('MenuState');
}
var global = [];
global.idLevel;
global.cacahueteEtoile = 0;
global.timeEtoile = 0;
global.actionEtoile = 0;
global.cacahueteMax; 
global.timeMax; 
global.actionMax;
var tabUnlockEtoile = [];
for (var i = 0; i < JSON.parse(localStorage['unlock']).length; i++) {
    tabUnlockEtoile.push(JSON.parse(localStorage['unlock'])[i]);
};



