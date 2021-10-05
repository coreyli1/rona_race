var game = new Phaser.Game(1500, 1000, Phaser.AUTO);
const gameState = { score: 0};


game.state.add('chasm', demo.chasm);

game.state.start('chasm');