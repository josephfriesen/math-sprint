import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/styles.scss';
import $ from 'jquery';
import { User } from './backEnd.js';



$(document).ready(function() {
  $("#round-start").attr("disabled", "disabled");
  let user;
  $("#get-user-name").submit(function(event) {
    // Game initialization
    event.preventDefault();
    const name = $("#user-name").val();
    user = new User(name);
    $(".welcome").slideUp();
    $("#round-start").removeAttr("disabled");
  })

  $("#round-start").click(function() {
    $(".clock").removeClass("swelling");
    $(".game-summary").slideUp();
    $("#round-start").attr("disabled", "disabled");
    user.startRound();
    $("#user-response").focus();
    function outerFunct() {
      if (user.currentProb < 15) {
        $(".problem-text").text(user.problemSet[user.currentProb].string);
      }
      let response = "";
      let problemListener = setInterval(function(){ // This function will type the current problem on the page, listen every 100ms that the correct answer has been entered by the user.
        user.timeRemaining = user.timeRemaining - 100;
        const currentResponse = parseInt($("#user-response").val());
        user.responseSet[user.currentProb] = currentResponse;
        response = user.evaluateAnswer(user.currentProb);
        if (response == "correct") {
          user.timeRemaining = user.timeLimit;
          user.updateScore();
          $(".round-score").text(user.roundScore);
          $(".game-score").text(user.gameScore);
          console.log("Game Score: " + user.gameScore);
          console.log("Round Score: " + user.roundScore);
          $(".evaluationResponse").show();
          $(".evaluationResponse").text("Correct!");
          $(".evaluationResponse").fadeOut("");
          $("#user-response").val("");
          stopTimer(problemListener);
          outerFunct();
        }
        if (user.timeRemaining <= 3000) {
          $(".clock").addClass("blinking");
        }
        if (user.timeRemaining <= 0) {
          $(".clock").removeClass("blinking");
          $(".clock").addClass("swelling");
          stopTimer(problemListener);
          gameOver(user, problemListener);
        }
        if (response == "end of round") {
          stopTimer(problemListener);
          displaySuccess(user);
          return;
        }
        $(".clock").text(Math.max((user.timeRemaining / 1000), 0).toFixed(1));
      }, 100);
    }
    outerFunct();
  });
})

function stopTimer(problemListener) {
  clearInterval(problemListener);
}

// function playTimer(user, timer) {
//   let response = "";
//   setInterval(function() {
//     response = user.evaluateAnswer(user.currentProb);
//   }, 100);
//   setTimeout(function(){
//     if (response == "incorrect") {
//       stopTimer(timer);
//       console.log("LOSER!");
//     }
//   }, 3000)
// }

// user.timeLimit

function displaySuccess(user){
  $(".problem-text").text("");
  $("#round-start").removeAttr("disabled");
  setTimeout(function(){
    $(".evaluationResponse").show();
    $(".evaluationResponse").text("Great job on round " + user.currentRound + "! Get ready for round " + (user.currentRound + 1) + ", where you will only have " + (user.getTime(user.currentRound + 1)/1000).toFixed(1) + " seconds for each question.");
    $(".game-summary").slideDown();
    $(".game-summary").append(`<div class='problem-set-${user.currentRound}'</div>`);
    $(`.problem-set-${user.currentRound}`).append(`<a href="#" id="problem-set-${user.currentRound}-dropdown">Show the results of Round ${user.currentRound}</a><ol id="problem-set-${user.currentRound}-list"</ol>`);
    user.problemSet.forEach(function(problem) {
      $(`#problem-set-${user.currentRound}-list`).append(`<li>${problem.string} ${problem.solution}</li>`);
    })
    $(`#problem-set-${user.currentRound}-dropdown`).click(function() {
      $(`#problem-set-${user.currentRound}-list`).slideToggle();
    });
  }, 500);
  $(".clock").text(`${(user.getTime(user.currentRound + 1)/1000).toFixed(1)}`);
}

function gameOver(user, timer) {
  stopTimer(timer);
  $(".evaluationResponse").show();
  $(".evaluationResponse").text("GAME OVER. Here's how you did:");
  $(".game-summary").slideDown();
}
