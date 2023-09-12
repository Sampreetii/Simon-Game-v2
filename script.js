let current_score = 0;
let high_score = 0;
let clicksound;
let difficultyLevel = '';
let timeDelayDefault = {
    'adaptive': 1000,
    'easy': 1000,
    'normal': 600,
    'hard': 200
}
let check = 0;
let timeDelay;
let gameOngoing = false;
let mainmusic;

let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;


function onClickAppStart() {
    document.getElementById('start').style.display = "none";
    document.getElementById('splashscreen').style.display = "block";
    onAppLoad();
}

function onAppLoad() {
    mainmusic = new Audio("assets/novusbgm.mp3");
    mainmusic.loop = true;
    setTimeout(() => {
        document.getElementById('splashscreen').style.display = "none";
    }, 5000);
    high_score = 0;
    resetScore();
    gameOngoing = false;
    difficultyLevel = 'adaptive';
    clicksound = new Audio("assets/other_button_click.wav");
}

function resetScore() {
    mainmusic.play();
    current_score = 0;
    timeDelay = JSON.parse(JSON.stringify(timeDelayDefault));
    setScore('currentscore', current_score);
    setScore('highscore', high_score);
}

function setScore(type, value) {
    document.getElementById(type).innerHTML = value > 9 ? value : '0' + value;
}

function increaseScore() {
    setScore('currentscore', ++current_score);
    if (high_score < current_score) {
        setScore('highscore', ++high_score);
    }
}


function onClickGameButton(button) {
    if (button === 'simon' && gameOngoing) {
        return;
    }
    document.getElementById("canvas").setAttribute("src", "assets/" + button + "_pressed.png");
    new Audio("assets/" + button + ".wav").play();

    setTimeout(() => {
        document.getElementById("canvas").setAttribute("src", "assets/stable.png");
    }, 200);
    if (button === 'simon') {
        startGame();
    }

}

function startGame() {
    gameOngoing = true;
    mainmusic.pause();
    mainmusic.currentTime = 0;
    showFollowInstructions();
    check = 1;
    if (!started) {
        nextSequence();
        started = true;
    }

}

function glowButton(button) {
    document.getElementById("canvas").setAttribute("src", "assets/" + button + "_glow.png");
    new Audio("assets/" + button + ".wav").play();
    setTimeout(() => {
        document.getElementById("canvas").setAttribute("src", "assets/stable.png");
    }, timeDelay[difficultyLevel]);
}

function triggerGameOver() {
    new Audio("assets/gameover.wav").play();
    document.getElementById('gameoverScreen').style.display = "block";
    document.getElementById('finalScore').innerHTML = " GAME OVER<br>Score: " + current_score;
    setTimeout(() => {
        document.getElementById('gameoverScreen').style.display = "none";
    }, 6000);
    setTimeout(() => {
        resetScore();
        gameOngoing = false;
        showPressToStart();
    }, 3000);
}

function showPressToStart() {
    document.getElementById("pressToStart").style.display = "block";
    document.getElementById("followInstructions").style.display = "none";
}

function showFollowInstructions() {
    document.getElementById("pressToStart").style.display = "none";
    document.getElementById("followInstructions").style.display = "block";
}


function difficultySelected(level) {
    if (!gameOngoing) {
        clicksound.pause();
        clicksound.currentTime = 0;
        clicksound.play();
        difficultyLevel = level;
        Array.from(document.getElementsByClassName('difficulty-option')).forEach(x => x.classList.remove('active'));
        document.getElementById(level).classList.add('active');
    }
}

function aboutSelected() {
    if (!gameOngoing) {
        clicksound.pause();
        clicksound.currentTime = 0;
        clicksound.play();
    }
}


function nextSequence() {
    if (check === 1) {
        setTimeout(function () {
            if (level < 5) {
                userClickedPattern = [];
                level++;


                let randomNumber = Math.floor(Math.random() * 4);
                let randomChosenColour = buttonColours[randomNumber];
                gamePattern.push(randomChosenColour);

                document.getElementById("canvas").setAttribute("src", "assets/" + randomChosenColour + "_pressed.png");
                colourAudio(randomChosenColour);
                setTimeout(() => {
                    document.getElementById("canvas").setAttribute("src", "assets/stable.png");
                }, 200);


            }


            else if (level < 10) {
                userClickedPattern = [];
                level++;



                let randomNumber1 = Math.floor(Math.random() * 4);
                let randomNumber2 = Math.floor(Math.random() * 4);


                let randomChosenColour1 = buttonColours[randomNumber1];
                let randomChosenColour2 = buttonColours[randomNumber2];
                gamePattern.push(randomChosenColour1);
                gamePattern.push(randomChosenColour2);


                setTimeout(function () {
                    document.getElementById("canvas").setAttribute("src", "assets/" + randomChosenColour1 + "_pressed.png");
                    colourAudio(randomChosenColour1);
                    setTimeout(() => {
                        document.getElementById("canvas").setAttribute("src", "assets/stable.png");
                    }, 200);

                }, 1000);
                setTimeout(function () {
                    document.getElementById("canvas").setAttribute("src", "assets/" + randomChosenColour2 + "_pressed.png");
                    colourAudio(randomChosenColour2);
                    setTimeout(() => {
                        document.getElementById("canvas").setAttribute("src", "assets/stable.png");
                    }, 200);
                }, 1500);




            }
            else {
                userClickedPattern = [];
                level++;



                let randomNumber1 = Math.floor(Math.random() * 4);
                let randomNumber2 = Math.floor(Math.random() * 4);
                let randomNumber3 = Math.floor(Math.random() * 4);


                let randomChosenColour1 = buttonColours[randomNumber1];
                let randomChosenColour2 = buttonColours[randomNumber2];
                let randomChosenColour3 = buttonColours[randomNumber3];
                gamePattern.push(randomChosenColour1);
                gamePattern.push(randomChosenColour2);
                gamePattern.push(randomChosenColour3);


                setTimeout(function () {
                    document.getElementById("canvas").setAttribute("src", "assets/" + randomChosenColour1 + "_pressed.png");
                    colourAudio(randomChosenColour1);
                    setTimeout(() => {
                        document.getElementById("canvas").setAttribute("src", "assets/stable.png");
                    }, 200);

                }, 1000);
                setTimeout(function () {
                    document.getElementById("canvas").setAttribute("src", "assets/" + randomChosenColour2 + "_pressed.png");
                    colourAudio(randomChosenColour2);
                    setTimeout(() => {
                        document.getElementById("canvas").setAttribute("src", "assets/stable.png");
                    }, 200);
                }, 1500);
                setTimeout(function () {
                    document.getElementById("canvas").setAttribute("src", "assets/" + randomChosenColour3 + "_pressed.png");
                    colourAudio(randomChosenColour3);
                    setTimeout(() => {
                        document.getElementById("canvas").setAttribute("src", "assets/stable.png");
                    }, 200);
                }, 2000);

            }


        }, 1000);
    }





}





$(".btn").click(function () {

    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);



    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                increaseScore();
                nextSequence();
            }, 1000);
        }
    } else {
        triggerGameOver();
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


function colourAudio(colorName) {
    new Audio(colorName + ".wav").play();
}