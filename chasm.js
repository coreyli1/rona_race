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
var word = "The quick brown fox jumps over the lazy dog. Learning how to type is important.";
var correct = [];
var previous = '';
demo.chasm.prototype = {

    preload: function(){ 
        game.load.image('track', 'assets/background.png');
        game.load.image('textbox', 'assets/textbox.jpg');
        game.load.spritesheet('virus', 'assets/virus.png', 32, 37);
        game.load.spritesheet('car', 'assets/racecar.png', 624.5,300);
    },
    create: function(){
        
        track = game.add.sprite(0,0,'track');
        track.scale.set(.75);
        textbox = game.add.sprite(200,game.world.height - 150 ,'textbox');
        textbox.scale.set(.6);

        virus = game.add.sprite(64, game.world.height - 350, 'virus');

        virus.scale.set(3.5);

        anim = virus.animations.add('run');
        anim.play(speed,true);

        car = game.add.sprite(64, game.world.height - 500, 'car');
        car.scale.set(.5);

        anim = car.animations.add('run');
        anim.play(5,true);


        timer = game.time.create(false);
        timer.loop(2000, moveVirus, this);
        timer.start();



        gameovertext = game.add.text(game.world.width/2-100, game.world.height/2, '', { fontSize: '64px', fill: '#000' });


        bmd = game.make.bitmapData(1000, 1000);
        bmd.context.font = '24px Arial';
        bmd.context.fillStyle = '#000';
        bmd.context.fillText('Type to start', 64, 64);
        correct = word.split("");

        console.log(correct);
        bmd.addToWorld(200,750,0,0,1,1);
        game.input.keyboard.addCallbacks(this, null, keyDown, keyPress );

        promptWord = "Type this phrase: " + word
        promptText = game.add.text(game.world.width/2-500, 50, promptWord, { fontSize: '20px', fill: '#000', backgroundColor: "#fff" });
        


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
var x = 64;
var y = 64;
function keyDown(char) {
    bmd.cls();

    if(game.input.keyboard.lastKey.keyCode == 8) {
        previous = previous.slice(0,-1);

        if (correct.join() == previous){
            bmd.context.fillStyle = '#00ff00';  
        }
        else{
            bmd.context.fillStyle = '#ff0000';            
        }

        bmd.context.fillText(previous,x,y);
    }
}
function keyPress(char) {
    //  Clear the BMD
    bmd.cls();
    console.log("char", char);







    console.log("prev", previous);
    console.log("correct", correct);
    console.log("keyCode", game.input.keyboard.lastKey.keyCode);
    if (game.input.keyboard.lastChar == correct[0]){
        console.log("right")
        removed = correct.shift();
        previous += removed;
        bmd.context.fillStyle = '#00ff00';
        bmd.context.fillText(previous,x,y);

        if(removed == " "){
            moveCar();
        }

        if(removed == "."){

        }

    

    }
    else{
        console.log("wrong")
        previous += game.input.keyboard.lastChar;
        bmd.context.fillStyle = '#ff0000';
        bmd.context.fillText(previous,64,64);

    }


}




