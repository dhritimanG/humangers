var mongoose = require('mongoose');
var ApplicationSchema = require('./website.schema.server');
var db  = require('../models.server');

var ApplicationModel = mongoose.model('WebsiteModel', ApplicationSchema);

ApplicationModel.findApplicationById = findApplicationById;
ApplicationModel.createApplicationForUser = createApplicationForUser;
ApplicationModel.findAllApplicationsForUser = findAllApplicationsForUser;
ApplicationModel.deleteApplication = deleteApplication;
ApplicationModel.updateApplication = updateApplication;

module.exports = ApplicationModel;


function findApplicationById(id) {
  return ApplicationModel.findOne({_id: id});
}

function createApplicationForUser(userId, application) {
  console.log("inside web of model");
  application.developerId = userId;
  return ApplicationModel.create(application)
    .then();
}

function findAllApplicationsForUser(userId) {
  return ApplicationModel.find({developerId: userId});
}

function deleteApplication(id) {
  return ApplicationModel.remove({_id: id});
}
function deletePage(pid) {
  return ApplicationModel.remove

}
function updateApplication(id, application) {
  console.log('inside update of web');
  return ApplicationModel.update({_id: id}, application);
}
