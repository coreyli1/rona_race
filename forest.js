demo.forest = function(){};
var player;
var platforms;
var cursors;

var apples;
var scoreText;

demo.forest.prototype = {

    preload: function(){    
        game.load.image('forest', 'assets/forest2.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('ledge', 'assets/ledge.png');
        game.load.image('apple', 'assets/apple.png');
        game.load.spritesheet('bird', 'assets/bird.png', 32, 32);
    },
    create: function(){
        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        game.add.sprite(0, 0, 'forest');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();

        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        // Here we create the ground.
        var ground = platforms.create(0, game.world.height - 64, 'ground');
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(4, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        //  Now let's create two ledges
        var branch = platforms.create(400, 750, 'ledge');
        branch.body.immovable = true;

        branch = platforms.create(400, 550, 'ledge');
        branch.body.immovable = true;

        branch = platforms.create(400, 350, 'ledge');
        branch.body.immovable = true;

        branch = platforms.create(150, 250, 'ledge');
        branch.body.immovable = true;

        branch = platforms.create(150, 450, 'ledge');
        branch.body.immovable = true;

        branch = platforms.create(150, 650, 'ledge');
        branch.body.immovable = true;

        branch = platforms.create(1150, 250, 'ledge');
        branch.body.immovable = true;

        branch = platforms.create(1170, 450, 'ledge');
        branch.body.immovable = true;

        branch = platforms.create(1150, 650, 'ledge');
        branch.body.immovable = true;

        branch = platforms.create(1150, 800, 'ledge');
        branch.body.immovable = true;

        // The player and its settings
        player = game.add.sprite(64, game.world.height - 180, 'bird');

        //  We need to enable physics on the player
        game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1], 4, true);
        player.animations.add('right', [2,3], 4, true);

        //  Finally some stars to collect
        apples = game.add.group();

        //  We will enable physics for any star that is created in this group
        apples.enableBody = true;

        var apple = apples.create(420, 700, 'apple');
        apple.body.gravity.y = 300;
        apple.body.bounce.y = 0.7 + Math.random() * 0.2;

        var apple = apples.create(420, 500, 'apple');
        apple.body.gravity.y = 300;
        apple.body.bounce.y = 0.7 + Math.random() * 0.2;

        var apple = apples.create(420, 300, 'apple');
        apple.body.gravity.y = 300;
        apple.body.bounce.y = 0.7 + Math.random() * 0.2;

        var apple = apples.create(170, 600, 'apple');
        apple.body.gravity.y = 300;
        apple.body.bounce.y = 0.7 + Math.random() * 0.2;

        var apple = apples.create(170, 400, 'apple');
        apple.body.gravity.y = 300;
        apple.body.bounce.y = 0.7 + Math.random() * 0.2;

        var apple = apples.create(170, 200, 'apple');
        apple.body.gravity.y = 300;
        apple.body.bounce.y = 0.7 + Math.random() * 0.2;

        var apple = apples.create(1170, 200, 'apple');
        apple.body.gravity.y = 300;
        apple.body.bounce.y = 0.7 + Math.random() * 0.2;

        var apple = apples.create(1190, 400, 'apple');
        apple.body.gravity.y = 300;
        apple.body.bounce.y = 0.7 + Math.random() * 0.2;

        var apple = apples.create(1170, 600, 'apple');
        apple.body.gravity.y = 300;
        apple.body.bounce.y = 0.7 + Math.random() * 0.2;

        var apple = apples.create(1170, 750, 'apple');
        apple.body.gravity.y = 300;
        apple.body.bounce.y = 0.7 + Math.random() * 0.2;

        

        //  The score
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();
   
    },
    update: function(){
        //  Collide the player and the stars with the platforms
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(apples, platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
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
    }
  };




function collectApple (player, apple) {
    
    // Removes the star from the screen
    apple.kill();

    //  Add and update the score
    gameState.score += 10;
    scoreText.text = 'Score: ' + gameState.score;

}

