export class Problem {
  constructor(operand1, operand2, operator) {
    this.operand1 = operand1;
    this.operand2 = operand2;
    this.operator = operator;
    this.string = `${operand1} ${operator} ${operand2} = `;
    this.solution = eval(`${operand1} ${operator} ${operand2}`);
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
    this.timeLimit = this.getTime(this.currentRound);
    this.timeRemaining = this.timeLimit;
  }

  updateScore() {
    this.roundScore = this.roundScore + 1;
    this.gameScore = this.gameScore + 1;
  }

  makeSupersets() {
    const superSetAdd = [];
    const superSetSub = [];
    const superSetMult = [];
    const superSetDiv = [];
    for(let i=0; i < 20; i++){
      for(let j=0; j < 20; j++){
        let prob = new Problem(i, j, "+");
        superSetAdd.push(prob);
        if (i >= j) {
          prob = new Problem(i, j, "-");
          superSetSub.push(prob);
        }
        if (i <= 10 && j <= 10) {
          prob = new Problem(i, j, "*");
          superSetMult.push(prob);
        }
        if (j != 0 && i % j == 0) {
          prob = new Problem(i, j, "/");
          superSetDiv.push(prob);
        }
      }
    }
    return [superSetAdd, superSetSub, superSetMult, superSetDiv];
  }
}
