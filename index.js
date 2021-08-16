var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];
var level=0;
var started=true;

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").html("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(0100).fadeIn(0100);
    playSound(randomChosenColor);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        if(screen.width<=400){
            $("h1").html("Game Over, Touch Anywhere To Start")
        }else{
            $("h1").text("Game Over, Press Any Key to Restart");
        }
        setTimeout(function () {
        $("body").removeClass("game-over");
        }, 0200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = true;
}



$(".common").click(function(event){
    var userChosenColor=event.target.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){ $("#"+currentColor).removeClass("pressed");},0100)
}
function playSound(name){
    var rgb=new Audio("sounds/"+name+".mp3");
    rgb.play();
}


$(document).keypress(function(){
    if(started===true)
    {
        nextSequence();
        started=false;
    }
});
$(document).on("tap",function(){
    if(started===true)
    {
        nextSequence();
        started=false;
    }
});
if(screen.width<=400){
    $("h1").html("Touch Anywhere To Start")
}
