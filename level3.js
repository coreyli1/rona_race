demo.level3 = function(){};
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
var word3 = "Did you think that was easy? Here are some harder words to spell.\nMisspell, Pharaoh, Intelligence, Pronunciation, and Gobbledegook";
var correct = [];
var previous = '';
demo.level3.prototype = {

    preload: function(){ 
        game.load.image('track', 'assets/paris.jpg');
        game.load.image('textbox', 'assets/newtextbox.jpg');
        game.load.image('topbox', 'assets/newtoptextbox.jpg');
        game.load.image('restart','assets/restartbutton.jpeg');
        game.load.image('next','assets/nextbutton.jpeg');
        game.load.spritesheet('virus', 'assets/virus.png', 32, 37);
        game.load.spritesheet('car', 'assets/racecar.png', 624.5,300);
    },
    create: function(){
        console.log("level2")
        
        track = game.add.sprite(0,0,'track');
        track.scale.set(.75);
        textbox = game.add.sprite(200,game.world.height - 150 ,'textbox');
        textbox.scale.set(.6);

        topbox = game.add.sprite(75,game.world.height - 1560 ,'topbox');
        topbox.scale.set(.92);

        virus = game.add.sprite(64, game.world.height - 350, 'virus');

        virus.scale.set(3.5);

        anim = virus.animations.add('run');
        anim.play(speed,true);

        car = game.add.sprite(64, game.world.height - 500, 'car');
        car.scale.set(.5);

        anim = car.animations.add('run');
        anim.play(5,true);

        restart = game.add.sprite(10, game.world.height - 150, 'restart');
        restart.scale.set(.1);
        restart.inputEnabled = true;
        restart.events.onInputDown.add(this.gameRestart, this);
        restart.visible = false;    

        next = game.add.sprite(game.world.width - 150, game.world.height - 150, 'next');
        next.scale.set(.1);
        next.inputEnabled = true;
        next.events.onInputDown.add(this.nextLevel, this);
        next.visible = false;


        timer = game.time.create(false);
        timer.loop(2000, this.moveVirus, this);
        


        gameovertext = game.add.text(game.world.width/2-100, game.world.height/2, '', { fontSize: '64px', fill: '#000' });

        typing = game.add.text(game.world.width/2 - 400,game.world.height - 100, "Type to start", {fontSize: '28px', fill: '#000'});


        correct = word3.split("");

        console.log(correct);
        game.input.keyboard.addCallbacks(this, null, this.keyDown, this.keyPress);

        promptWord = "Type this phrase: \n" + word3;
        promptText = game.add.text(game.world.width/2-500, 50, promptWord, { fontSize: '36px', fill: '#000', backgroundColor: "#fff" });
        


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
            restart.visible = true;

            gameovertext.text = 'Game Over!';
        }

        if(car.x > game.world.width)
        {
            car.animations.stop(null, true);
            virus.animations.stop(null, true);
            timer.stop()
            restart.visible = true;

            gameovertext.text = 'You Win!';
        }



        
    },
    moveVirus: function() {
        virus.x += 100;
    },
    moveCar: function()  {
        car.x += 75;
    },

    keyDown: function(char) {
        console.log("char", char.code);
        console.log(correct);

        if(char.code == "Backspace") {
            previous = previous.slice(0,-1);

            typing.setText(previous);
        }
    },

    keyPress: function(char) {

        console.log("char", char);
        timer.start();








        console.log("prev", previous);
        console.log("correct", correct);
        console.log("correct[0]", correct[0], "\n");
        console.log("keyCode", game.input.keyboard.lastKey.keyCode);

        if (char == correct[0] || (game.input.keyboard.lastKey.keyCode == 13 && correct[0] == "\n")){
            console.log("right")
            removed = correct.shift();
            console.log(removed)
            previous += removed;
            typing.addColor("#00ff00",0);
            typing.setText(previous);

            if(removed == " "){
                this.moveCar();
            }

            if(removed == "."){

            }

        

        }
        else{
            console.log("wrong")
            previous += char;
            typing.addColor("#ff0000",0);
            typing.setText(previous);


        }


    },

    gameRestart: function() {

        game.state.start('level3');
        previous = '';

    },

    nextLevel: function() {

        game.state.start('level3');
        previous = '';

    }
  };



