var request = require('request');
var Promise = require('bluebird');

// Here's a custom asynchronous function that sends a network request
// Following best practices, it follows node's style of (...args, callback)
// Notice that `callback` also follows the node pattern of (err, result)
var getStatusCode = function (url, callback) {
  request(url, function (err, response, body) {
    if (err) { callback(err, null); }

    // We now have access to `response` however,
    // we'll have to pass it into our callback to do anything with it:
    callback(null, response.statusCode);
  });
};

// Set `getStatusCodeWithPromisify` to be a promisified version of `getStatusCode`
var getStatusCodeWithPromisify;
// NOTE: promisify doesn't care what the underlying asyncronous work is,
// it can be used for any function that follows the node style pattern above

module.exports = getStatusCodeWithPromisify;
