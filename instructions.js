demo.instructions = function(){}; 

demo.instructions.prototype = {
    preload: function () {
        //  You can fill the preloader with as many assets as your game requires

        //  Here we are loading an image. The first parameter is the unique
        //  string by which we'll identify the image later in our code.

        //  The second parameter is the URL of the image (relative)
        game.load.image('instructions', 'assets/instructions.jpeg');

    },

    create: function() {

        //  This creates a simple sprite that is using our loaded image and
        //  displays it on-screen and assign it to a variable
        var image = game.add.sprite(game.world.centerX, game.world.centerY, 'instructions');

        //  Moves the image anchor to the middle, so it centers inside the game properly
        image.anchor.set(0.5);

        //  Enables all kind of input actions on this image (click, etc)
        image.inputEnabled = true;

        image.events.onInputDown.add(this.gameStart, this);

    },
    gameStart: function() {
        game.state.start('chasm');
    }


}   
