module.exports = function (app) {
  var ApplicationModel = require('../model/website/website.model.server');

  app.get('/api/user/:userId/application', findAllApplicationsForUser);
  app.post('/api/user/:userId/application', createApplication);
  app.get('/api/application/:appId', findApplicationById);
  app.delete('/api/application/:appId/page/:pid', deletePage);
  app.delete('/api/application/:appId', deleteApplication);
  app.put('/api/application/:appId', updateApplication);
  app.put('/api/application/:appId/page', addPageToApplication);
  app.put('/api/application/:appId/page/:pid/widget', addWidgetsToPage);
  app.put('/api/application/:appId/currPage/:currId/page/:pid', updatePage);
  app.delete('/api/application/:appId/page/:pid/widget/:widgetIndex', deleteWidget);
  app.get('/api/application/:appId/page/:pid/widget/:widgetIndex', findWidgetByIndex);
  app.put('/api/application/:appId/page/:pid/widget/:widgetIndex', updateWidget);


  function findAllApplicationsForUser(req, res) {
    var userId = req.params['userId'];
    ApplicationModel.findAllApplicationsForUser(userId)
      .then(function (websites) {
        res.json(websites);
      });
  }

  function createApplication(req, res) {
    console.log("inside web of website server");
    var application = req.body;
    ApplicationModel.createApplicationForUser(application.developerId, application)
      .then(function (website) {
        res.json(website);
      })
  }

  function deleteApplication(req, res) {
    var appId = req.params['appId'];
    ApplicationModel.deleteApplication(appId)
      .then(function (status) {
        res.json(status);
      })
  }

  function updateApplication(req, res) {
    var appId = req.params['appId'];
    ApplicationModel.updateApplication(appId, req.body)
      .then(function (status) {
        res.json(status);
      })
  }

  function findApplicationById(req, res) {
    var appId = req.params['appId'];
    ApplicationModel.findApplicationById(appId)
      .then(function (website) {
        res.json(website);
      })
  }


  function addPageToApplication(req, res) {
      var appId = req.params['appId'];
      var page = req.body;
      ApplicationModel.findApplicationById(appId)
          .then(function (application) {

              // application = application.toObject();
            if(!application.pages){
                application.pages = {};
            }
            application.pages[page.name] = page;
            console.log(application);
            application.markModified('pages');
            return application.save();
          })
          .then(function (application) {
              res.json(application);
          });
  }
  function addWidgetsToPage(req, res) {
      var appId = req.params['appId'];
      var pageName = req.params['pid'];

      var widget = req.body;
      ApplicationModel.findApplicationById(appId)
          .then(function (application) {
              if(!application.pages[pageName].widgets){
                  application.pages[pageName].widgets = [];
              }
              application.pages[pageName].widgets.push(widget);
              application.markModified('pages');
              return application.save();
          })
          .then(function (application) {
              res.json(application);
          });
  }
  function deletePage(req,res) {
      var appId = req.params['appId'];
      var pageName = req.params['pid'];
      ApplicationModel.findApplicationById(appId)
          .then(function (application) {
              delete application.pages[pageName];
              application.markModified('pages');
              return application.save();
          })
          .then(function (application) {
              res.json(application);
          });
  }

  function updatePage(req, res) {
      var appId = req.params['appId'];
      var pageName = req.params['pid'];
      var currPage = req.params['currId'];
      var page = req.body;
      ApplicationModel.findApplicationById(appId)
          .then(function (application) {
              delete application.pages[currPage];
              if(!application.pages){
                  application.pages = {};
              }
              application.pages[pageName] = page;
              application.markModified('pages');
              return application.save();
          })
          .then(function (application) {
              res.json(application);
          });
  }

  function deleteWidget(req, res) {
      var appId = req.params['appId'];
      var pageName = req.params['pid'];
      var widgetIndex = req.params['widgetIndex'];
      ApplicationModel.findApplicationById(appId)
          .then(function (application) {
              // application.pages[pageName].widgets.splice(widgetIndex,1);
              console.log(application.pages[pageName].widgets[widgetIndex]);
              // delete application.pages[pageName].widgets[widgetIndex];
              application.pages[pageName].widgets.splice(widgetIndex,1);
              console.log(application.pages[pageName].widgets[widgetIndex]);
              application.markModified('pages');
              return application.save();
          })
          .then(function (application) {
              res.json(application);
          });
  }

  function findWidgetByIndex(req, res) {
      var appId = req.params['appId'];
      var pageName = req.params['pid'];
      var widgetIndex = req.params['widgetIndex'];
      ApplicationModel.findApplicationById(appId)
          .then(function (application) {
              var widget = application.pages[pageName].widgets[widgetIndex];
              res.json(widget);
          })
  }

  function updateWidget(req, res) {
      var appId = req.params['appId'];
      var pageName = req.params['pid'];
      var widgetIndex = req.params['widgetIndex'];
      var updatedWidget = req.body;
      ApplicationModel.findApplicationById(appId)
          .then(function (application) {
              application.pages[pageName].widgets[widgetIndex] = updatedWidget;
              application.markModified('pages');
              return application.save();
          })
  }
}
