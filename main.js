var game = new Phaser.Game(1300, 900, Phaser.AUTO);

game.state.add('title',demo.titlescreen);


game.state.add('instructions',demo.instructions);

game.state.add('chasm', demo.chasm);
game.state.add('level2', demo.level2);
game.state.add('level3', demo.level3);
game.state.start('title');