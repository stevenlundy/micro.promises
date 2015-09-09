var fs = require('fs');
var expect = require('chai').expect;
var proxyquire = require('proxyquire');
var Promise = require('bluebird');
var delay = require('../lib/asyncLib.js').delay;

describe('Bare Minimum -', function() {

  describe('readfileWithPromisify.js', function () {
    var readFileWithPromisify = require('../src/readFileWithPromisify.js');
   
    it('should return a promise', function () {
      var filePath = __dirname + '/../lib/file_to_read';

      // must return a Bluebird promise. ES6 promise won't work here
      expect(readFileWithPromisify(filePath)).to.be.an.instanceOf(Promise);
    });

    it('should make file content available in the `then` block', function (done) {
      var filePath = __dirname + '/../lib/file_to_read';

      readFileWithPromisify(filePath)
        .then(function (content) {
          expect(content.toString()).to.contain('This is a file to read');
          done();
        });
    });

    it('should make any errors available in the `catch` block', function (done) {
      var filePath = __dirname + '/../lib/not_the_file_to_read';

      readFileWithPromisify(filePath)
        .catch(function (err) {
          expect(err.code).to.equal('ENOENT');
          done();
        });
    });
  });

  describe('getStatusCodeWithPromisify.js', function () {
    var getStatusCodeWithPromisify = require('../src/getStatusCodeWithPromisify.js');

    it('should return a promise', function () {
      var url = 'https://google.com';

      // must return a Bluebird promise. ES6 promise won't work here
      expect(getStatusCodeWithPromisify(url)).to.be.an.instanceOf(Promise);
    });

    it('should make the status code available in the `then` block', function (done) {
      var url = 'https://google.com';

      getStatusCodeWithPromisify(url)
        .then(function (statusCode) {
          expect(statusCode).to.equal(200);
          done();
        });
    });

    it('should make any errors available in the `catch` block', function (done) {
      var url = 'https::///thisIsNoUrl.comedy';

      getStatusCodeWithPromisify(url)
        .catch(function (err) {
          expect(err).to.exist;
          done();
        });
    });
  });

  describe('readfileWithPromise.js', function () {
    var readFileWithPromise = require('../src/readFileWithPromise.js');

    it('should return a promise', function () {
      var filePath = __dirname + '/../lib/file_to_read';

      // must return a Bluebird promise. ES6 promise won't work here
      expect(readFileWithPromise(filePath)).to.be.an.instanceOf(Promise);
    });

    it('should make file content available in the `then` block', function (done) {
      var filePath = __dirname + '/../lib/file_to_read';

      readFileWithPromise(filePath)
        .then(function (content) {
          expect(content).to.be.an.instanceOf(Buffer);
          expect(content.toString()).to.contain('This is a file to read');
          done();
        });
    });

    it('should make any errors available in the `catch` block', function (done) {
      var filePath = __dirname + '/../lib/not_the_file_to_read';

      readFileWithPromise(filePath)
        .catch(function (err) {
          expect(err.code).to.equal('ENOENT');
          done();
        });
    });
  });

  describe('getStatusCodeWithPromise.js', function () {
    var getStatusCodeWithPromise = require('../src/getStatusCodeWithPromise.js');

    it('should return a promise', function () {
      var url = 'https://google.com';

      // must return a Bluebird promise. ES6 promise won't work here
      expect(getStatusCodeWithPromise(url)).to.be.an.instanceOf(Promise);
    });

    it('should make the status code available in the `then` block', function (done) {
      var url = 'https://google.com';

      getStatusCodeWithPromise(url)
        .then(function (statusCode) {
          expect(statusCode).to.equal(200);
          done();
        });
    });

    it('should make any errors available in the `catch` block', function (done) {
      var url = 'https::///thisIsNoUrl.comedy';

      getStatusCodeWithPromise(url)
        .catch(function (err) {
          expect(err).to.exist;
          done();
        });
    });
  });

  describe('pluckFirstLineFromFile.js', function () {
    var pluckFirstLine = require('../src/pluckFirstLineFromFile.js');

    it('should return a promise', function () {
      // Must return a Bluebird promise. ES6 promise won't work here
      expect(pluckFirstLine(__dirname + '/../lib/file_to_read')).to.be.an.instanceOf(Promise);
    });

    it('should resolve to a string', function (done) {
      pluckFirstLine(__dirname + '/../lib/file_to_read')
        .then(function (firstLineOfFile) {
          expect(firstLineOfFile).to.be.a('string');
          done();
        });
    });

    it('should make the first line of a file available in the `then` block', function (done) {
      pluckFirstLine(__dirname + '/../lib/file_to_read')
        .then(function (firstLineOfFile) {
          expect(firstLineOfFile).to.equal('This is a file to read');
          done();
        });
    });
  });

  describe('getFromAPIAndWriteToFile.js', function () {

    var filePath = __dirname + '/../lib/file_to_write_to';
    var apiURL = 'https://api.github.com/zen';

    // For this test we'll hit github's zen api endpoint. It requires the User-Agent header to be set, so instead of passing the 
    // `apiURL` directly into `request`, we'll pass this options hash, containing the url and the needed header, instead.
    var options = {
      uri: apiURL,
      headers: { 'User-Agent': 'someUserAgent' }
    };
    
    var fsStub = {};

    it('should write contents to a file', function (done) {

      fsStub.writeFile = function (filePath, content, callback) {
        fs.writeFile(filePath, content, function (err) {
          if (err) { throw new Error(err); }

          var fileContent = fs.readFileSync(filePath).toString();
          expect(fileContent.length).to.be.above(5);
          // Empty write file after testing
          fs.writeFileSync(filePath, '');
          done();
        });
      };

      // Empty write file before testing
      fs.writeFileSync(filePath, '');

      // Here we use the `proxyquire` module to hijack `fs.writeFile` invocations inside `getFromAPIAndWriteToFile.js`.
      // This allows us to run our tests as `fs.writeFile` is being invoked, making the asynchronous nature of testing
      // file writes rather easy.
      var getFromAPIAndWriteToFile = proxyquire('../src/getFromAPIAndWriteToFile.js', { 'fs': fsStub });
      getFromAPIAndWriteToFile(options, filePath);

    });
  });

  describe('combineFirstLineOfManyFiles.js', function () {
    var combine = require('../src/combineFirstLineOfManyFiles.js');

    var fileToWriteTo = __dirname + '/../lib/file_to_write_to';

    var filesToRead = [
      __dirname + '/../lib/file_to_read',
      __dirname + '/../lib/file_two_read',
      __dirname + '/../lib/file_three_read'
    ];

    beforeEach(function() {
      // Make sure our test file is clean before we try writing to it
      fs.writeFileSync(fileToWriteTo, '');
    });

    it('should return a promise', function () {
      // Must return a Bluebird promise. ES6 promise won't work here
      expect(combine(filesToRead, fileToWriteTo)).to.be.an.instanceOf(Promise);
    });

    it('should write the first lines of each file to the output file', function (done) {
      combine(filesToRead, fileToWriteTo)
        .then(function() {
          // If a promise is returned,
          // The file should be successfully written
          // before this block is run
          fs.readFile(fileToWriteTo, function(err, content) {
            var newFile = content.toString();
            expect(newFile).to.equal([
              'This is a file to read',
              'Yet another file',
              'A file of three'
            ].join('\n'));
            done();
          });
        });
    });

    afterEach(function() {
      // Clean up anything written to our test file
      fs.writeFileSync(fileToWriteTo, '');
    });
  });

});

describe('Advanced Content -', function () {

  xdescribe('putItAllTogether.js', function () {
    var putItAllTogether = require('../src/putItAllTogether.js');
    var lib = require('../lib/putItAllTogetherHelpers');

    it('should return a promise', function () {
      // Must return a Bluebird promise. ES6 promise won't work here
      expect(putItAllTogether(['danthareja'])).to.be.an.instanceOf(Promise);
    });

    it('should resolve to an array of tags', function (done) {
      this.timeout(5000);
      putItAllTogether(['danthareja'])
        .then(function(tags) {
          expect(tags).to.be.an.instanceOf(Array);
          done();
        });
    });

    it('should have adjectives in an array of tags', function (done) {
      this.timeout(5000);
      putItAllTogether(['danthareja'])
        .then(function(tags) {
          expect(tags).to.contain('men');
          done();
        });
    });

    it('should not have duplicate adjectives in the array of tags', function (done) {
      this.timeout(5000);
      putItAllTogether(['danthareja', 'bethjohnson'])
        .then(function(tags) {
          var uniques = Object.keys(
            tags.reduce(function(hash, tag) {
              hash[tag] = tag;
              return hash;
            }, {})
          );

          expect(uniques.length).to.equal(tags.length);
          done();
        });
    });

    it('should contain the correct tags', function (done) {
      this.timeout(5000);
      putItAllTogether(['danthareja', 'sunny-g'])
        .then(function(tags) {
          expect(tags).to.contain('men');
          done();
        });
    });
  });

  xdescribe('writeYourOwnPromisify.js', function () {
    var promisify = require('../src/writeYourOwnPromisify.js');

    it('should return a promise-aware function', function () {
      var readFileAsync = promisify(fs.readFile);
      expect(readFileAsync).to.be.a.Function;
    });

    it('should make file content available in the `then` block', function (done) {
      var readFileAsync = promisify(fs.readFile);
      var filePath = __dirname + '/../lib/file_to_read';

      readFileAsync(filePath)
        .then(function (content) {
          expect(content.toString()).to.contain('This is a file to read');
          done();
        });
    });

    it('should make file content available in the `catch` block', function (done) {
      var readFileAsync = promisify(fs.readFile);
      var filePath = __dirname + '/../lib/not_the_file_to_read';

      readFileAsync(filePath)
        .catch(function (err) {
          expect(err).to.exist;
          done();
        });
    });
  });

  xdescribe('writeYourOwnPromiseDotAll.js', function () {
    var promiseDotAll = require('../src/writeYourOwnPromiseDotAll.js');

    it('should return a promise', function () {
      // delay comes from lib/asyncLib.js
      var arrayOfPromises = ['a','b','c'].map(delay);

      // Must return a Bluebird promise. ES6 promise won't work here
      expect(promiseDotAll(arrayOfPromises)).to.be.an.instanceOf(Promise);
    });

    it('should return a promise that resolves to an array of values' , function (done) {
      var arrayOfPromises = ['a','b','c'].map(delay);

      promiseDotAll(arrayOfPromises)
        .then(function (values) {
          expect(values).to.be.an.instanceOf(Array);
          done();
        });
    });

    it('should resolve to an array of values that exist at the same index as their promise counterparts', function (done) {
      var arrayOfPromises = [
        delay(25, 'a'), // will fulfill to 'a' after 25ms
        delay(10, 'b'), // will fulfill to 'b' after 10ms
        delay(50, 'c'), // will fulfill to 'c' after 50ms
      ];

      promiseDotAll(arrayOfPromises)
        .then(function (values) {
          expect(values).to.deep.equal(['a', 'b', 'c']); // order matters
          done();
        });
    });

    it('should reject the returned promise if any promise in the input array is rejected', function (done) {
      var arrayOfPromises = [
        delay(25, 'a'), // will fulfill to 'a' after 25ms
        delay(10, 'b'), // will fulfill to 'b' after 10ms
        delay(10001, 'c'), // will reject immediately
      ];

      promiseDotAll(arrayOfPromises)
        .catch(function (err) {
          expect(err.message).to.equal('Delay for value c is too long');
          done();
        });
    });
  });

  xdescribe('writeYourOwnPromiseDotRace.js', function () {
    var promiseDotRace = require('../src/writeYourOwnPromiseDotRace.js');

    it('should return a promise', function () {
      // delay comes from lib/asyncLib.js
      var arrayOfPromises = ['a','b','c'].map(delay);

      // Must return a Bluebird promise. ES6 promise won't work here
      expect(promiseDotRace(arrayOfPromises)).to.be.an.instanceOf(Promise);
    });

    it('should resolve with a single value', function (done) {
      var arrayOfPromises = [
        delay(25, 'a'), // will fulfill to 'a' after 25ms
        delay(10, 'b'), // will fulfill to 'b' after 10ms
        delay(50, 'c'), // will fulfill to 'c' after 50ms
      ];

      promiseDotRace(arrayOfPromises)
        .then(function (value) {
          expect(value).to.be.a.String;
          done();
        });
    });

    it('should fulfill with the value if the first resolved promise is fulfulled', function (done) {
      var arrayOfPromises = [
        delay(25, 'a'), // will fulfill to 'a' after 25ms
        delay(10, 'b'), // will fulfill to 'b' after 10ms
        delay(50, 'c'), // will fulfill to 'c' after 50ms
      ];

      promiseDotRace(arrayOfPromises)
        .then(function (value) {
          expect(value).to.equal('b');
          done();
        });
    });

    it('should reject with the error if the first resolved promise is rejected', function (done) {
      var arrayOfPromises = [
        delay(25, 'a'), // will fulfill to 'a' after 25ms
        delay(10, 'b'), // will fulfill to 'b' after 10ms
        delay(10001, 'c'), // will reject immediately
      ];

      promiseDotRace(arrayOfPromises)
        .catch(function (err) {
          expect(err.message).to.equal('Delay for value c is too long');
          done();
        });
    });
  });

});
