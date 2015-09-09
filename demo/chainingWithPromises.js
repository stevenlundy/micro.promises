// This demonstration uses your code!
var getStatusCode = require('../src/getStatusCodeWithPromise.js'); // Make sure the tests are passing
var colors = require('colors');

// We can also return promises in a .then() block!
// Let's ammend our golden rule:

// The golden rule for chaining promises together is:
//   Whatever is returned (using the keyword `return`) from a .then() block, 
//   is passed to the next .then() block in the chain, AND:
//                           
//   - If a syncronous value is returned, that value is immediately
//     passed to the next .then() block
//
//   - If a promise is returned, the value that fulfills the promise is eventually
//     passed to the next .then() block

// Run `node demo/chainingWithPromises.js` to see this in action
// Try to guess the timing of the console.logs before running it for the first time
getStatusCode('https://google.com')
  .then(function addOneToStatusCode (statusCode) {
    console.log('statusCode'.yellow+' inside of '+'addOneToStatusCode'.green);
    console.log(statusCode);
    console.log('Resolving'.magenta+' promise returned from '+'addOneToStatusCode'.green);

    // We can return a newly created promise
    return new Promise(function (resolve, reject) {
      // We're using setTimeout to simulate an asyncronous action, but you could imagine that this promise
      // could easily represent the future value of a network request/file system action/database write/etc.
      setTimeout(function() {
        resolve(statusCode + 1); // Whatever is passed into resolve() is made available in the next .then()
      }, 2000);
    });
    
  })
  .then(function getAnotherStatusCode (statusCode) {
    console.log('Resolved!'.cyan);
    console.log('statusCode'.yellow+' inside of '+'getAnotherStatusCode'.green);
    console.log(statusCode);
    console.log('Resolving'.magenta+' promise returned from '+'getAnotherStatusCode'.green);

    // We can also return the invocation of a promise-aware function
    return getStatusCode('http://github.com');
  })
  .then(function logNewStatusCode (githubStatusCode) {
    console.log('Resolved!'.cyan);
    console.log('githubStatusCode'.yellow+' inside of '+'logStatusCode'.green);
    console.log(githubStatusCode);
  });