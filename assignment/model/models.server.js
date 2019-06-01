var mongoose = require('mongoose');
var connectionString = 'mongodb://localhost/test'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
  var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
  var password = process.env.MLAB_PASSWORD_WEBDEV;
  connectionString = 'mongodb://' + username + ':' + password;
  connectionString += '@ds129024.mlab.com:29024/heroku_v4cxql63'; // use yours
}

// var options = { promiseLibrary: require('bluebird') };
// var db1 = mongoose.createConnection(connectionString, options);
//
// Band = db1.model('band-promises', { name: String });
//
// db1.on('openUri', function() {
//   assert.equal(Band.collection.findOne().constructor, require('bluebird'));
// });


var db = mongoose.connect(connectionString, {
  useMongoClient: true
});

module.exports = db;

module.exports = db;
