var demo = {}, centerX = 1000 / 2, centerY = 800 / 2, adam, speed = 6;
demo.titlescreen = function(){}; 

demo.titlescreen.prototype = {
    preload: function () {

        //  You can fill the preloader with as many assets as your game requires

        //  Here we are loading an image. The first parameter is the unique
        //  string by which we'll identify the image later in our code.

        //  The second parameter is the URL of the image (relative)
        game.load.image('title', 'assets/rona.png');

    },

    create: function()
    {

        //  This creates a simple sprite that is using our loaded image and
        //  displays it on-screen and assign it to a variable
        var image = game.add.sprite(game.world.centerX, game.world.centerY, 'title');

        //  Moves the image anchor to the middle, so it centers inside the game properly
        image.anchor.set(0.5);
        image.inputEnabled = true;



        image.events.onInputDown.add(instructionsStart, this);

    }
}

function instructionsStart() {
    game.state.start('instructions');
}