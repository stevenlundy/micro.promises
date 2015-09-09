// Read through `examples/chainingWithValues.js` before completing this exercise

var readFile = require('./readFileWithPromise.js');

// Fill out this function so that the first line of the file at `filePath` will be available
// in the `then` block chained onto a `pluckFirstLineFromFile` invocation
var pluckFirstLineFromFile = function(filePath) {
  // With the callback pattern, the `return` keyword usually does nothing
  // By returning the promise that results from this promise chain,
  // we can continue chaining `then` blocks off an invocation of this function
  // (see the tests for an example of this)
  return readFile(filePath)
    .then(function stringifyFile (fileBuffer) {
      // the `return` keyword makes the stringified file available in the next `then` block
      return fileBuffer.toString();
    })
    .then(function pluckFirstLine (stringifiedFile) {
      // YOUR CODE HERE
    });
};

module.exports = pluckFirstLineFromFile;
