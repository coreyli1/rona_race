
var demo = {}, centerX = 1400 / 2, centerY = 900 / 2, adam, speed = 6;
demo.chasm = function(){};
var player;
var platforms;
var cursors;

var apples;
var applecount = 0;
var scoreText;
var anim;
var loc = 0;
var speed = 10;
demo.chasm.prototype = {

    preload: function(){    
        game.load.image('ground', 'assets/platform.png');
        game.load.spritesheet('virus', 'assets/virus.png', 32, 37);
    },
    create: function(){


        virus = game.add.sprite(64, game.world.height - 250, 'virus');

        virus.scale.set(3);

        anim = virus.animations.add('run');
        anim.play(speed,true);



        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();
   
    },
    update: function(){
        virus.x -= 2;

        if (virus.x < -virus.width)
        {
            virus.x = game.world.width;
        }

        if (virus.x == 100)
        {
            speed += 5;
            anim.play(speed,true);
        }

        
    }
  };





