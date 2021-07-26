const express = require('express');
const fs = require('fs-extra');
const path = require("path");
const router = express.Router();
const packageJSON = require('../../package.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  const metadataPath = path.join(__dirname, "../../apps-dist/metadata.json");
  console.log('metadataPath: ', metadataPath);
  let appsMetadata = [];
  if(fs.existsSync(metadataPath)){
    appsMetadata = fs.readJSONSync(metadataPath);
  }
  
  res.render('index', {
    title: packageJSON.displayName||packageJSON.name||"Examples",
    description: packageJSON.description,
    homepage: packageJSON.homepage,
    keywords: packageJSON.keywords,
    appsMetadata: appsMetadata
  });
});

module.exports = router;
