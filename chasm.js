
var demo = {}, centerX = 1000 / 2, centerY = 800 / 2, adam, speed = 6;
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
        game.load.image('track', 'assets/racetrack.png');
        game.load.spritesheet('virus', 'assets/virus.png', 32, 37);
        game.load.spritesheet('car', 'assets/racecar.png', 624.5,300);
    },
    create: function(){

        track = game.add.sprite(0,0,'track');

        virus = game.add.sprite(64, game.world.height - 250, 'virus');

        virus.scale.set(3.5);

        anim = virus.animations.add('run');
        anim.play(speed,true);

        car = game.add.sprite(64, game.world.height - 400, 'car');
        car.scale.set(.5);

        anim = car.animations.add('run');
        anim.play(5,true);


        timer = game.time.create(false);
        timer.loop(2000, moveVirus, this);
        timer.start();

        //  Our controls.
        promptText = 'Type to start'
        text = game.add.text(16, game.world.height - 64, promptText, { fontSize: '32px', fill: '#000' });
        game.input.keyboard.addCallbacks(this, null, null, keyPress);

        gameovertext = game.add.text(game.world.width/2-100, game.world.height/2, '', { fontSize: '64px', fill: '#000' });


    },
    update: function(){
        // virus.x += speed;
        // car.x += speed;

        // if (virus.x > game.world.width && car.x > game.world.width)
        // {
        //     virus.x = 0;
        //     car.x = 0;
        // }

        // if (virus.x == 100)
        // {
        //     speed += 5;
        //     anim.play(10,true);
        // }

        if(anim.isPlaying)
        {
            track.x -= 1;
        }

        if(virus.x > game.world.width)
        {
            car.animations.stop(null, true);
            virus.animations.stop(null, true);

            gameovertext.text = 'Game Over!';
        }

        
    }
  };
function moveVirus() {
    virus.x += 500;
}
// function keyPress(char) {
//     //  Clear the BMD
//     bmd.cls();

//     //  Set the x value we'll start drawing the text from
//     var x = 64;

//     //  Loop through each letter of the word being entered and check them against the key that was pressed
//     for (var i = 0; i < word.length; i++)
//     {
//         var letter = word.charAt(i);

//         //  If they pressed one of the letters in the word, flag it as correct
//         if (char === letter)
//         {
//             correct[letter] = true;
//         }

//         //  Now draw the word, letter by letter, changing colour as required
//         if (correct[letter])
//         {
//             bmd.context.fillStyle = '#00ff00';
//         }
//         else
//         {
//             bmd.context.fillStyle = '#ffffff';
//         }

//         bmd.context.fillText(letter, x, 64);

//         x += bmd.context.measureText(letter).width;
//     }
// }




