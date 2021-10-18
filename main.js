var game = new Phaser.Game(1300, 900, Phaser.AUTO);
const gameState = { score: 0};

game.state.add('title',demo.titlescreen);
game.state.start('title');

game.state.add('instructions',demo.instructions);
game.state.start('instructions');

game.state.add('chasm', demo.chasm);
game.state.start('chasm');
