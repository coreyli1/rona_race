var game = new Phaser.Game(1300, 900, Phaser.AUTO);
const gameState = { score: 0};


game.state.add('chasm', demo.chasm);

game.state.start('chasm');
