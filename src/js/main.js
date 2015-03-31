window.addEventListener("load",init);
function init()
{
  game = new Phaser.Game(1280, 700, Phaser.AUTO, '');
  game.state.add('MenuState' ,MenuState);
  //game.state.add('QuitState' ,QuitState);
  game.state.add('LevelState' ,LevelState);
  //on lance le mainmenu
  game.state.start('MenuState');
}
