module.exports = function (app) {
  require('./services/user.service.server')(app);
  var db = require('./model/models.server');
  require('./services/website.service.server')(app);
  require('./services/page.service.server')(app);
  require('./services/widgets.service.server')(app);
 };
