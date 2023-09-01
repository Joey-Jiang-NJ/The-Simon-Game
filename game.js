var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false; //boolean

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id"); //choose the button clicked and get the id
  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

$("body").keydown(function () {
  if (!started) nextSequence(); //run nextSequence() only on the first keydown
  started = true;
});

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
    }
    console.log("success");
  } else {
    console.log("wrong");

    playSound("wrong"); //make sound of wrong

    //show the game-over effect
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    //resete variables;
    startOver();
  }
}

//get the right input and start a new turn
function nextSequence() {
  //clear the user input array to wait for new input
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level); //change title

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
  //   var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  //   audio.play(); //must be interact with user's interaction with the page, can be play automatically
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play(); //must be interact with user's interaction with the page, can be play automatically
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
