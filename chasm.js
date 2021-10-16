
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
var bmd;
var word = "a quick brown fox moves";
var correct = [];
var previous = '';
demo.chasm.prototype = {

    preload: function(){ 
        game.load.image('track', 'assets/racetrack.png');
        game.load.image('textbox', 'assets/textbox.jpg');
        game.load.spritesheet('virus', 'assets/virus.png', 32, 37);
        game.load.spritesheet('car', 'assets/racecar.png', 624.5,300);
    },
    create: function(){

        track = game.add.sprite(0,0,'track');
        textbox = game.add.sprite(500,game.world.height - 150 ,'textbox');


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



        gameovertext = game.add.text(game.world.width/2-100, game.world.height/2, '', { fontSize: '64px', fill: '#000' });


        bmd = game.make.bitmapData(1000, 400);
        bmd.context.font = '32px Arial';
        bmd.context.fillStyle = '#000';
        bmd.context.fillText('Type to start', 64, 64);
        correct = word.split("");

        console.log(correct);
        bmd.addToWorld(500,750,0,0,1,1);
        game.input.keyboard.addCallbacks(this, null, null, keyPress);

        promptText = game.add.text(game.world.width/2-100, 50, word, { fontSize: '32px', fill: '#000' });



    },
    update: function(){
        if(anim.isPlaying)
        {
            track.x -= 1;
        }

        if(virus.x > game.world.width)
        {
            car.animations.stop(null, true);
            virus.animations.stop(null, true);
            timer.stop();

            gameovertext.text = 'Game Over!';
        }

        if(car.x > game.world.width)
        {
            car.animations.stop(null, true);
            virus.animations.stop(null, true);
            timer.stop()

            gameovertext.text = 'You Win!';
        }



        
    }
  };
function moveVirus() {
    virus.x += 100;
}
function moveCar() {
    car.x += 100;
}
function keyPress(char) {
    //  Clear the BMD
    bmd.cls();

    //  Set the x value we'll start drawing the text from
    var x = 64;

    //  Loop through each letter of the word being entered and check them against the key that was pressed

    // for (var i = 0; i < word.length; i++)
    // {
    //     var letter = word.charAt(i);

    //     //  If they pressed one of the letters in the word, flag it as correct
    //     if (char === letter)
    //     {
    //         correct[letter] = 'pressed';
    //     }

    //     //  Now draw the word, letter by letter, changing colour as required
    //     if (correct[letter])
    //     {
    //         bmd.context.fillStyle = '#00ff00';
    //     }
    //     else
    //     {
    //         bmd.context.fillStyle = '#000000';
    //     }

    //     bmd.context.fillText(letter, x, 64);

    //     x += bmd.context.measureText(letter).width;
    // }



    console.log("prev", previous);
    console.log("correct", correct);

    if (game.input.keyboard.lastChar == correct[0]){
        removed = correct.shift();
        previous += removed;
        bmd.context.fillStyle = '#00ff00';
        bmd.context.fillText(previous,x,64);

        if(removed == " "){
            moveCar();
        }
    

    }   
    else{

        bmd.context.fillStyle = '#ff0000';
        bmd.context.fillText(game.input.keyboard.lastChar,64,64);
        correct.shift();
    }


}




