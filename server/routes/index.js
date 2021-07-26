var express = require('express');
var router = express.Router();
var appsMetadata = require('../../apps-dist/metadata.json');
var packageJSON = require('../../package.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: packageJSON.displayName||packageJSON.name||"Examples",
    description: packageJSON.description,
    homepage: packageJSON.homepage,
    keywords: packageJSON.keywords,
    appsMetadata: appsMetadata
  });
});

module.exports = router;
