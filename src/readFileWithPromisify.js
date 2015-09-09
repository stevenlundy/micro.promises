var fs = require('fs');
// Even though Promises are native in ES6, not all environments support them yet,
// so we will use the Bluebird library in this sprint.
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

// Set `readFileWithPromisify` to be a promisified version of `fs.readFile`
var readFileWithPromisify;

module.exports = readFileWithPromisify;
