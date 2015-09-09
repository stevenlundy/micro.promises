// This demonstration uses your code!
var getStatusCode = require('../src/getStatusCodeWithPromise.js'); // Make sure the tests are passing
var colors = require('colors');

// Let's further ammend our rule:

// The golden rule for chaining promises together is:
//   Whatever is returned (using the keyword `return`) from a .then() block, 
//   is passed to the next .then() block in the chain, AND:
//                           
//   - If a syncronous value is returned, that value is immediately
//     passed to the next .then() block
//
//   - If a promise is returned, the value that fulfills the promise is eventually
//     passed to the next .then() block
//  
//   - If a promise is returned and and error occurs inside the promise,
//     the error falls past the chain, skipping all .then() blocks,
//     until it gets caught by a .catch() block.
//     If there is no .catch block, the error will get swallowed. ALWAYS CATCH YOUR PROMISE CHAINS
//     (This rule actually applies to syncronous .then() blocks as well)

// Run `node demo/chainingWithErrors.js` to see this in action
// Try to guess which console.logs get exectued before running it for the first time
getStatusCode('https://google.com')
  .then(function addOneToStatusCode (statusCode) {
    console.log('statusCode'.yellow+' inside of '+'addOneToStatusCode'.green);
    console.log(statusCode);
    console.log('Resolving'.magenta+' promise returned from '+'addOneToStatusCode'.green);

    return new Promise(function (resolve, reject) {
      setTimeout(function() {
        reject(new Error('Cannot compute')); // Reject promise with an error
      }, 2000);
    });
    
  })
  // Error falls past all .then blocks...
  .then(function addTwoToStatusCode (statusCode) {
    return statusCode + 2;
  })
  .then(function logStatusCode (statusCode) {
    console.log('statusCode'.yellow+' inside of '+'logStatusCode'.green);
    console.log(statusCode);
    return statusCode;
  })
  // ... not executing any of them until caught
  .catch(function handleError(error) {
    console.log('Rejected!'.red);
    console.log('error'.yellow+' inside of '+'handleError'.green);
    console.log(error);
    // And then anything returned here would continue onto the next .then()
  });
