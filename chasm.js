
var demo = {}, centerX = 1500 / 2, centerY = 1000 / 2, adam, speed = 6;
demo.chasm = function(){};
var player;
var platforms;
var cursors;

var apples;
var applecount = 0;
var scoreText;

demo.chasm.prototype = {

    preload: function(){    
        game.load.image('ground', 'assets/platform.png');
        game.load.spritesheet('bird', 'assets/virus.png', 32, 32);
    },
    create: function(){
        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        // game.add.sprite(0, 0, 'chasm');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();

        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        // Here we create the ground.
        var ground = platforms.create(-150, game.world.height - 100, 'ground');
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);
        
        var ground2 = platforms.create(860, game.world.height - 100, 'ground');
        ground2.scale.setTo(2, 2);
        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;
        ground2.body.immovable = true;



        // The player and its settings
        player = game.add.sprite(64, game.world.height - 150, 'bird');

        //  We need to enable physics on the player
        game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1], 4, true);
        player.animations.add('right', [2,3], 4, true);



        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();
   
    },
    update: function(){
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(apples, platforms);

        game.physics.arcade.overlap(player, apples, collectApple, null, this);

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -150;

            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('right');
        }
        else
        {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }
        
        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down && hitPlatform)
        {
            player.body.velocity.y = -350;
        }    


        if (gameState.score == 10*(applecount-1))
        {
            game.state.start('forest');
        }

    }
  };



function collectApple (player, apple) {
    
    // Removes the star from the screen
    apple.kill();

    //  Add and update the score
    gameState.score += 10;
    scoreText.text = 'Score: ' + gameState.score;

}

