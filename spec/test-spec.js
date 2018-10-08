import { User, Problem } from './../src/backEnd.js';

describe('Testing output', function() {

  const User1 = new User("Joe");
  let rand;
  beforeEach(function() {
    rand = Math.floor(Math.random()*79);
  });

  it('gives the correct math sentence stored in object key Problem.string!', function() {
    expect(User1.superSet[0][rand].string).toEqual(User1.superSet[0][rand].operand1 + " + " + User1.superSet[0][rand].operand2 + " = ");
    expect(User1.superSet[1][rand].string).toEqual(User1.superSet[1][rand].operand1 + " - " + User1.superSet[1][rand].operand2 + " = ");
    expect(User1.superSet[2][rand].string).toEqual(User1.superSet[2][rand].operand1 + " * " + User1.superSet[2][rand].operand2 + " = ");
    expect(User1.superSet[3][rand].string).toEqual(User1.superSet[3][rand].operand1 + " / " + User1.superSet[3][rand].operand2 + " = ");
  });

  it('gives the correct solution to the problem stored in object key Problem.solution', function() {
    expect(User1.superSet[0][rand].solution).toEqual(User1.superSet[0][rand].operand1 + User1.superSet[0][rand].operand2);
    expect(User1.superSet[1][rand].solution).toEqual(User1.superSet[1][rand].operand1 - User1.superSet[1][rand].operand2);
    expect(User1.superSet[2][rand].solution).toEqual(User1.superSet[2][rand].operand1 * User1.superSet[2][rand].operand2);
    expect(User1.superSet[3][rand].solution).toEqual(User1.superSet[3][rand].operand1 / User1.superSet[3][rand].operand2);
  });








});
