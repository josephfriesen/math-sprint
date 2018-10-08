import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/styles.scss';
import $ from 'jquery';
import { User } from './backEnd.js';



$(document).ready(function() {
  let user;
  $("#get-user-name").submit(function(event) {
    event.preventDefault();
    const name = $("#user-name").val();
    user = new User(name);
    $(".welcome").slideUp();
    user.startRound();
    let problemListener = setInterval(function(){
      if (user.currentProb < 15) {
        $(".problem-text").text(user.problemSet[user.currentProb].string);
      }
      const currentResponse = parseInt($("#user-response").val());
      user.responseSet[user.currentProb] = currentResponse;
      const response = user.evaluateAnswer(user.currentProb);
      if (response == 1) {
        console.log("goooood")
        $("#user-response").val("");
      }
      if (response == 2) {
        stopTimer();
        console.log("round over!");
        return;
      }
    }, 100);
    function stopTimer() {
      clearInterval(problemListener);
    }
  })

})
