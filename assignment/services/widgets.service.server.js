module.exports = function (app) {
  var multer = require('multer');
  var upload = multer({ dest: __dirname+'/../../src/assets/uploads' });
  var WidgetModel = require('../model/widget/widget.model.server');

  app.post('/api/page/:pageId/widget', createWidget);
  app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
  app.get('/api/widget/:widgetId', findWidgetById);
  app.delete('/api/widget/:widgetId', deleteWidget);
  app.put('/api/widget/:widgetId', updateWidget);
  app.put('/api/page/:pageId/widget', sortWidgets);
  app.post ('/api/upload', upload.single('myFile'), uploadImage);
  app.put('/api/page/:pageId/widget', updateWidgetOrder);


  function findAllWidgetsForPage(req, res) {
    var pageId = req.params['pageId'];
    WidgetModel.findAllWidgetsForPage(pageId)
      .then(function (widgets) {
        res.json(widgets);
      })
  }

  function createWidget(req, res) {
    var widget = req.body;
    WidgetModel.createWidget(widget.pageId, widget)
      .then(function (widget) {
        res.json(widget);
      })
  }

  function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    WidgetModel.deleteWidget(widgetId)
      .then(function (status) {
        res.json(status);
      })
  }

  function updateWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = req.body;
    WidgetModel.updateWidget(widgetId, widget)
      .then(function (status) {
        return WidgetModel.findAllWidgetsForPage(widgetId.pageId);
      })
      .then(function (widgets){
        res.json(widgets);
        return;
      },function (err) {
        res.sendStatus(404).send(err);
        return;
      });
  }

  function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    WidgetModel.findWidgetById(widgetId)
      .then(function (widget) {
        res.json(widget);
      })
  }

  function sortWidgets(req, res) {
    var initial = req.query['initial'];
    var final = req.query['final'];
  }

  function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widget = getWidgetById(widgetId);
    widget.url = '/assets/uploads/'+filename;
    widget.width = width;

    var callbackUrl   =  '/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget' ;

    res.redirect(callbackUrl);
  }

  function updateWidgetOrder(req, res) {
    var pageId = req.param('pageId');
    var startIndex = parseInt(req.query.initial);
    var endIndex = parseInt(req.query.final);

    WidgetModel
      .reorderWidget(pageId, startIndex, endIndex)
      .then(function (resp) {
        res.json(resp);
      }, function (err) {
        res.status(500).send(err);
    });
  }

}
