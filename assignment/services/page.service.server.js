module.exports = function (app) {

  var PageModel = require('../model/page/page.model.server');

  app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
  app.post('/api/website/:websiteId/page', createPage);
  app.get('/api/page/:pageId', findPageById);
  app.delete('/api/page/:pageId', deletePage);
  app.put('/api/page/:pageId', updatePage);


  function findAllPagesForWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    PageModel.findAllPagesForWebsite(websiteId)
      .then(function (pages) {
        res.json(pages);
      })
  }

  function createPage(req, res) {
    console.log('inside page of page server');
    var page = req.body;
    PageModel.createPage(page.websiteId, page)
      .then(function (page) {
        res.json(page);
      }, function(err) {
        res.status(500).send(err);
      });
  }

  function deletePage(req, res) {
    var pageId = req.params['pageId'];
    PageModel.deletePage(pageId)
      .then(function (status) {
        res.json(status);
      });
  }

  function updatePage(req, res) {
    var pageId = req.params['pageId'];
    PageModel.updatePage(pageId, req.body)
      .then(function (status) {
        res.json(status);
      });
  }

  function findPageById(req, res) {
    var pageId = req.params['pageId'];
    PageModel.findPageById(pageId)
      .then(function (page) {
        res.json(page);
      });
  }
}

