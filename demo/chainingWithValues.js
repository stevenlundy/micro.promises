// This demonstration uses your code!
var readFile = require('../src/readFileWithPromise.js'); // Make sure the tests are passing
var colors = require('colors');

// Every .then() invocation on a promise returns a new promise
// This means that .then() invocations can be chained together

// The golden rule for chaining promises together is:
//   Whatever is returned (using the keyword `return`) from a .then() block, 
//   is passed to the next .then() block in the chain

// Run `node demo/chainingWithValues.js` to see this in action
readFile(__dirname + '/../lib/file_to_read')
  .then(function stringifyFile(fileBuffer) {
    console.log('fileBuffer'.yellow+' inside of '+'stringifiedFile'.green);
    console.log(fileBuffer);
    
    // the `return` keyword makes the stringified file available in the next .then() block
    return fileBuffer.toString();
  })
  .then(function appendFile(stringifiedFile) {
    console.log('stringifiedFile'.yellow+' inside of '+'appendFile'.green);
    console.log(stringifiedFile);

    return stringifiedFile + '\nOMG PROMISES RULEEE';
  })
  .then(function logReuslt(appendedFile) {
    console.log('appendedFile'.yellow+' inside of '+'logReuslt'.green);
    console.log(appendedFile);
    // We're not returning anything here, so we can't continue the chain
  });
