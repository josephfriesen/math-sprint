import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/styles.scss';
import $ from 'jquery';
import { Problem } from './backEnd.js';



$(document).ready(function() {
  let dog = new Problem(5, 4, "+")
  console.log(dog);
});
