/**
 * Test file for the Validator class.
 * Imports the Validator class from './validator.js'.
 */
import { Validator } from './validator.js';

// create a class object Validator
const validator = new Validator();

// valid e-mail - true
console.log("Valid e-mail address - true");
console.log(validator.validateEmail('fi@secondpart.end'));
console.log(validator.validateEmail('first-part@.se=cond%p.art.end'));
console.log(validator.validateEmail('first.part@se=cond%part.r'));

// invalid e-mail -  folse
console.log("Invalid e-mail address - folse");
console.log(validator.validateEmail('f@secondart.end,'));
console.log(validator.validateEmail('first-part@.se=cond@part.end'));
console.log(validator.validateEmail('-firstpart@.se=cond%.enddeded'));
console.log(validator.validateEmail('firs_tpart@.se.en)'));
console.log(validator.validateEmail('firstpart@.se.enddeded'));

// valid phone numbers- true
console.log("Valid phone numbers - true");
console.log(validator.validatePhoneNumber('+38 (099) 567 8901'));
console.log(validator.validatePhoneNumber('+38 099 5 6 7 8 9  01'));
console.log(validator.validatePhoneNumber('(09-9) 567-890-1'));
console.log(validator.validatePhoneNumber('--  (099) 567 890-1'));
console.log(validator.validatePhoneNumber(' + 3 8  099 56 78-90- 1 '));
console.log(validator.validatePhoneNumber('-+-3-8-099 -56 78-90- 1- '));

// invalid phone numbers - folse
console.log("Invalid phone numbers - folse");
console.log(validator.validatePhoneNumber('+38 (099) 567 8901 0'));
console.log(validator.validatePhoneNumber('+38 099 a0000000'));
console.log(validator.validatePhoneNumber('+38 (0989) 567 8901'));
console.log(validator.validatePhoneNumber('+48 (0989) 567 8901'));

// valid password true
console.log("Valid password - true");
console.log(validator.validatePassword('C00l_Pass'));
console.log(validator.validatePassword('SupperPas1'));

// invalid phone password" - folse
console.log("Invalid phone password - folse");
console.log(validator.validatePassword('Cool_pass'));
console.log(validator.validatePassword('C00l'));