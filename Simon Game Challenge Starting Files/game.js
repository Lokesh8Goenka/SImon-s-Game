
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

$("div[type='button']").click(function(){

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

var start = false;
var level = 0;

$(document).keypress(function(){
    if (!start){
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
});

function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern = [];

    var randonNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randonNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    // var audio = new Audio("sounds/" + "randomChosenColour" + ".mp3");
    // audio.play();
}

function animatePress(currentColour){
    
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}

function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // console.log("success");

        if(gamePattern.length == userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },100);
        }
    }
    else{
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();

        // console.log("Wrong");
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    start = false;

}