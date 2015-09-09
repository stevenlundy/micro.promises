var Promise = require('bluebird');

/**
 * Write your own version of `Promise.all`
 *
 * Given an array which contains promises, return a promise that is
 * fulfilled when all the items in the array are fulfilled.
 *
 * The promise's fulfillment value is an array with fulfillment values
 * at respective positions to the original array.
 *
 * If any promise in the array rejects, the returned promise
 * is rejected with the rejection reason.
 */

var promiseDotAll = function (arrayOfPromises) {
  // YOUR CODE HERE
};

module.exports = promiseDotAll;
