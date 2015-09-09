var Promise = require('bluebird');

/**
 * Write your own version of Bluebird's `Promise.promisify`
 *
 * Return a function that will wrap the given nodeStyleFn.
 * Instead of taking a callback, the returned function will return a promise
 * whose fate is decided by the callback behavior of the given nodeStyleFn.
 *
 * In other words:
 *   If the nodeStyleFn succeeds, the promise should fulfill with the results
 *   If the nodeStyleFn fails, the promise should reject with the error
 *
 * The nodeStyleFn should conform to node.js convention of
 * accepting a callback as last argument and calling that callback
 * with error as the first argument and success value on the second argument.
 */

var promisify = function (nodeStyleFn) {
  // YOUR CODE HERE
};

module.exports = promisify;
