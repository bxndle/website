var fs = require('fs');
var md5 = require('md5-file');
// Imports the Google Cloud client library
var Vision = require('@google-cloud/vision');
var mongoose = require('mongoose');

require('../backend/models/db.js');
require('../backend/models/content.js');
var Content = mongoose.model('Content');

// Instantiates a client
var visionClient = Vision({
  keyFilename: __dirname + '/Bundle Image Tagging-41e6d3f201ca.json',
  projectId: 'bundle-image-tagging'
});

var numTagging = 0;

var tag = function(path) {
  var contentMD5 = md5.sync(path);

  // Performs landmark detection on the image
  numTagging++;
  visionClient.landmarkDetection({ source: { filename: path} })
  .then((results) => {
    if (results[0] !== null) {
      var landmarks = results[0].landmarkAnnotations;
      Content.findOne({md5 : contentMD5.toString().toUpperCase()}, function(err, contentItem) {
        if(err) { console.log(err); return; }
        if(contentItem === null) { console.log('Item is NULL. MD5 : ' + contentMD5); return; }
        contentItem.landmarks = landmarks;
        contentItem.save(function (err2) {
          if(err2) { console.log(err2); return; }
          numTagging--;
          console.log('      Complete ' + numTagging.toString() + ' landmarks ' + path);
          return;
        });
      });
    }
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });

  // Performs property detection on the image
  numTagging++;
  visionClient.imageProperties({ source: { filename: path } })
  .then((results) => {
    if (results[0] !== null) {
      var colors = results[0].imagePropertiesAnnotation.dominantColors.colors;
      Content.findOne({md5 : contentMD5.toString().toUpperCase()}, function(err, contentItem) {
        if(err) { console.log(err); return; }
        if(contentItem === null) { console.log('Item is NULL. MD5 : ' + contentMD5); return; }
        contentItem.colors = colors;
        contentItem.save(function (err2) {
          if(err2) { console.log(err2); return; }
          numTagging--;
          console.log('      Complete ' + numTagging.toString() + ' colors ' + path);
          return;
        });
      });
    }
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });

  // Detect similar images on the web to the image
  numTagging++;
  visionClient.webDetection({ source: { filename: path } })
  .then((results) => {
    if (results[0] !== null) {
      var webEntities = results[0].webDetection.webEntities;
      Content.findOne({md5 : contentMD5.toString().toUpperCase()}, function(err, contentItem) {
        if(err) { console.log(err); return; }
        if(contentItem === null) { console.log('Item is NULL. MD5 : ' + contentMD5); return; }
        contentItem.web = webEntities;
        contentItem.save(function (err2) {
          if(err2) { console.log(err2); return; }
          numTagging--;
          console.log('      Complete ' + numTagging.toString() + ' web ' + path);
          return;
        });
      });
    }
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });

  // Performs label detection on the image
  numTagging++;
  visionClient.labelDetection({ source: { filename: path } })
  .then((results) => {
    if (results[0] !== null) {
      var labels = results[0].labelAnnotations;
      Content.findOne({md5 : contentMD5.toString().toUpperCase()}, function(err, contentItem) {
        if(err) { console.log(err); return; }
        if(contentItem === null) { console.log('Item is NULL. MD5 : ' + contentMD5); return; }
        contentItem.labels = labels;
        contentItem.save(function (err2) {
          if(err2) { console.log(err2); return; }
          numTagging--;
          console.log('      Complete ' + numTagging.toString() + ' labels ' + path);
          return;
        });
      });
    }
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });

  return;
}

var feeds = fs.readdirSync('feeds');

for( var i = 0; i < feeds.length; i++) {
  if(feeds[i] === '.DS_Store') { continue; }

  var content = fs.readdirSync('feeds/' + feeds[i]);
  for (var j = 0; j < content.length; j++) {
    if(content[j] === '.DS_Store' ||
      content[j] === feeds[i] + '.jpg' ||
      content[j] === 'background.jpg'||
      content[j] === 'description.txt'
    ) { continue; }
    tag('feeds/' + feeds[i] + '/' + content[j]);
  }
}
