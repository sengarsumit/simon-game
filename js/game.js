var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level); 
        nextSequence();
        started = true;
    }
});


$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    
});

    
function nextSequence(){
    //changing it back to an empty array
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    
    var random = Math.floor((Math.random() * 4));
    var randomChosenColor = buttonColours[random];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

//CAN BE DONE THIS WAY AS WELL
// if(randomChosenColor === red){
//     $("#red").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
//     var r = new Audio("sounds/red.mp3");
//     r.play();
// }else if(randomChosenColor === blue){
//     $("#blue").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
//     var b = new Audio("sounds/blue.mp3");
//     b.play();
// }else if(randomChosenColor === green){
//     $("#green").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
//     var g = new Audio("sounds/red.mp3");
//     g.play();
// }else if(randomChosenColor === yellow){
//     $("#yellow").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
//     var y = new Audio("sounds/red.mp3");
//     y.play();
// }

}

function playSound(name){
    $(name).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
      $("#" + currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
      if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
          console.log("success");
          if(gamePattern.length === userClickedPattern.length){
              
            setTimeout(function(){
                nextSequence();
              },1000);     
             
          }
      }else{
          console.log("wrong");
          var a = new Audio("sounds/wrong.mp3");
          a.play();
          $("body").addClass("game-over");
          setTimeout(function(){
            $("body").removeClass("game-over");
          },200);

          $("h1").text("Game Over, Press Any Key to Restart");
          startOver();
          
      }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}