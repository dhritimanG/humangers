var mongoose = require('mongoose');

var applicationSchema = mongoose.Schema({
  developerId:{type: mongoose.Schema.Types.ObjectId, ref:'UserModel'},
  applicationName: String,
  description: String,
  dateCreated: {type: Date,default: Date.now()},
  pages: Object,
  // pages:[{type:mongoose.Schema.Types.ObjectId, ref:'PageModel'}]
},{collection: "application"});

module.exports = applicationSchema;
