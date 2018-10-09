import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/styles.scss';
import $ from 'jquery';
import { User } from './backEnd.js';



$(document).ready(function() {
  //API CALL
  //   $('.buttontest').click(function() {
  //     let request = new XMLHttpRequest();
  //     const url = `https://ghibliapi.herokuapp.com/`;
  //     request.onreadystatechange = function() {
  //     if (this.readyState === 4 && this.status === 200) {
  //       const response = JSON.parse(this.responseText);
  //       getElements(response);
  //     }
  //   }
  //   request.open("GET", url, true);
  //   request.send();
  //   const getElements = function(response) {
  //     console.log(response);
  //     $('.buttontest').text(response)
  //   }
  // });


  //APP START
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
    $.get(`http://numbersapi.com/${user.problemSet[14].solution}/trivia?notfound=floor&fragment`, function(data) {
      $('.trivia').text(`Your last answer was ${user.problemSet[14].solution}. Did you know that ${user.problemSet[14].solution} is ${data}?`);
    });
    $(".game-summary").slideDown();
    $("#round-list").append(`<li class='problem-set-${user.currentRound}'><a href='#' class='problem-set-link' data-value='${user.currentRound}'>Click here to see your results for round ${user.currentRound}</a></li>`);
    $("a.problem-set-link").last().click(function() {
      $(".problems-list").hide();
      const index = $(this).data("value") - 1;
      $(".problems-list").text(`Round ${index + 1}`);
      user.gameSets[index].forEach(function(prob) {
        $(".problems-list").append(`<li>${prob.string} ${prob.solution}</li>`);
      })
      $(".problems-list").fadeIn();
    });
  }, 500);
  $(".clock").text(`${(user.getTime(user.currentRound + 1)/1000).toFixed(1)}`);
}

function gameOver(user, timer) {
  stopTimer(timer);
  $(".evaluationResponse").show();
  $(".evaluationResponse").text("GAME OVER. Here's how you did:");
  $(".game-summary").slideDown();
  $("#round-list").append(`<li class='problem-set-${user.currentRound}'><a href='#' class='problem-set-link' data-value='${user.currentRound}'>Click here to see your results for round ${user.currentRound}</a></li>`);
  $("a.problem-set-link").last().click(function() {
    $(".problems-list").hide();
    const stop = user.currentProb;
    console.log(stop);
    const index = $(this).data("value") - 1;
    $(".problems-list").text(`Round ${index + 1}`);
    for (let i = 0; i < stop - 1; i++) {
      $(".problems-list").append(`<li>${user.problemSet[i].string} ${user.problemSet[i].solution}</li>`);
    }
    $(".problems-list").append(`<li><span class='loser'>${user.problemSet[user.currentProb].string} ${user.problemSet[user.currentProb].solution}</span>`)
    $(".problems-list").fadeIn();
  });
}
