var asyncLib = require('../lib/asyncLib.js');

/**
 * A common asyncronous pattern:
 *   1. Run a few async tasks (read some files, send API requests, etc.)
 *   2. Collect or transform the data from those tasks
 *   3. Run a new async task based on the collected data
 *
 * The challenge becomes ensuring all our tasks have completed
 * before moving onto the next task. Promises make this problem easy!
 *
 * Promise.all is a very powerful method that handles
 * a collection of async tasks with ease
 *
 * Use this file as your sandbox to learn about Promise.all
 *
 * Run the example with `node demo/PromiseDotAll.js`,
 * tinker around with the code here and/or peek under the hood at lib/asyncLib
 * then continue to the exercises when you're ready
 */

Promise.all([
  asyncLib.getValueA(),
  asyncLib.getValueB(),
  asyncLib.getValueC(),
  asyncLib.getValueD()
])
.then(asyncLib.logResolvedValues)
.then(asyncLib.filterValuesFromCollection)
.then(asyncLib.doMoreAsyncWorkWithFilteredValues)
// `bind` sets correct context when using console.log as a callback
.catch(console.log.bind(console));
