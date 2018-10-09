export class Problem {
  constructor(operand1, operand2, operator) {
    this.operand1 = operand1;
    this.operand2 = operand2;
    this.operator = operator;
    this.string = `${operand1} ${operator} ${operand2} = `;
    this.solution = eval(`${operand1} ${operator} ${operand2}`);
    this.value = 0;
  }
}

export class User {
  constructor(name) {
    this.name = name;
    this.gameScore = 0;
    this.roundScore = 0;
    this.rounds = [];
    this.currentRound = 0;
    this.operatorIndex = 0;
    this.superSet = this.makeSupersets();
    this.problemSet = [];
    this.gameSets = [];
    this.timelimit = 0;
    this.responseSet = [];
    this.currentProb = 0;
    this.timeRemaining = 0;
  }



  buildProblemSet() {
    const out = [];
    for (let i = 1; i <= 15; i++) {
      let oper = Math.floor(Math.random()*this.operatorIndex);
      let prob = this.superSet[oper][Math.floor(Math.random()*this.superSet[oper].length)];
      out.push(prob);
    }
    return out;
  }

  getTime(n) {
    return Math.floor((10000)/(n));
  }

  tickTime(){
    let timeLeft = this.timeLimit;
    setInterval(function(){
      timeLeft -= 1000;
    }, 10000)
  }

  evaluateAnswer(currentProb) {
    if (this.problemSet[this.currentProb] != undefined){
      if (this.responseSet[currentProb] == this.problemSet[currentProb].solution) {
        this.currentProb += 1;
        // console.log(this.responseSet[currentProb]);
        // console.log(this.problemSet[currentProb].solution);
        return "correct";
      }
      else {
        // console.log(this.responseSet);
        console.log(this.problemSet[currentProb].solution);
        return "incorrect";
      }
    } else if(this.problemSet[this.currentProb] == undefined){
      return "end of round";
    } else {
      console.log("error!");
    }
  }

  startRound() {
    this.currentRound += 1;
    this.operatorIndex = Math.min(this.operatorIndex+1, 4);
    this.roundScore = 0;
    this.currentProb = 0;
    this.problemSet = this.buildProblemSet();
    this.gameSets.push(this.problemSet);
    this.timeLimit = this.getTime(this.currentRound);
    this.timeRemaining = this.timeLimit;
  }

  updateScore() {
    console.log(this.currentProb);
    this.roundScore = this.roundScore + this.problemSet[this.currentProb-1].value;
    this.gameScore = this.gameScore + this.problemSet[this.currentProb-1].value;
  }

  makeSupersets() {
    const superSetAdd = [];
    const superSetSub = [];
    const superSetMult = [];
    const superSetDiv = [];
    for(let i=0; i < 20; i++){
      for(let j=0; j < 20; j++){
        let prob = new Problem(i, j, "+");
        prob.value = 1;
        superSetAdd.push(prob);
        if (i >= j) {
          prob = new Problem(i, j, "-");
          prob.value = 2;
          superSetSub.push(prob);
        }
        if (i <= 10 && j <= 10) {
          prob = new Problem(i, j, "*");
          prob.value = 3;
          superSetMult.push(prob);
        }
        if (j != 0 && i % j == 0) {
          prob = new Problem(i, j, "/");
          prob.value = 4;
          superSetDiv.push(prob);
        }
      }
    }
    return [superSetAdd, superSetSub, superSetMult, superSetDiv];
  }
}
