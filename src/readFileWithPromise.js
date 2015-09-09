var fs = require('fs');
var Promise = require('bluebird');

var filePath = __dirname + '/../lib/file_to_read';

// Here's a built-in node function that accesses the file system
// It's an asyncronous function, so it accepts a callback as it's last argument
// All of node's async functions use the same the (...args, callback) pattern
// Notice that `callback` follows a specific pattern of (err, result)
fs.readFile(filePath, function (err, content) {
  if (err) { throw new Error(err); }
  // We now have access to `content` however, we'll have to pass it into another function to do anything with it:
  // e.g. someCallbackFunction(content.toString());
});

// Use promises in this function such that the content of the file at `filePath` will be available 
// in the `then` block chained onto a `readFileWithPromise` invocation, and any errors during fs.readFile
// will be available in the `catch` block
var readFileWithPromise = function (filePath) {
  // YOUR CODE HERE
};

module.exports = readFileWithPromise;
