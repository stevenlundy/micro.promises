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

// Use promises in this function such that the status code of a GET request to the `url`
// will be available in the `then` block chained onto a `getStatusCodeWithPromise` invocation
// and any errors occuring with the request will be available in the `catch` block
var getStatusCodeWithPromise = function (url) {
  // YOUR CODE HERE
};

module.exports = getStatusCodeWithPromise;
