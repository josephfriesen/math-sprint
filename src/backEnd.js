export class Problem {
  constructor(operand1, operand2, operator) {
    this.operand1 = operand1;
    this.operand2 = operand2;
    this.operatorStr = operator;
    this.string = `${operand1} ${operator} ${operand2} = `;
    this.solution = eval(`${operand1} ${operator} ${operand2}`);
  }
}

export class User {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.rounds = [];
    this.currentRound = 0;
    this.operatorIndex = 0;
    this.problemSet = this.buildProblemSet();
    // this.timelimit = this.getTime();
    this.responseSet = [];
    this.superSet = this.makeSupersets();
    // this.outcomes = this.evaluateAnswers();
  }

  buildProblemSet() {
    const out = [];

    for (let i = 1; i <= 15; i++) {
      let oper = Math.floor(Math.random()*this.operatorIndex);
    }
    return out;
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
        prob = new Problem(i, j, "-");
        superSetSub.push(prob);
        prob = new Problem(i, j, "*");
        superSetMult.push(prob);
        prob = new Problem(i, j, "/");
        superSetDiv.push(prob);
      }
    }
    return [superSetAdd, superSetSub, superSetMult, superSetDiv];
  }
}
