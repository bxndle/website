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

  console.log('Tagging : ' + path);
  var imgPath = path + '/content.jpg';
  var contentMD5 = md5.sync(imgPath).toUpperCase();

  // Performs landmark detection on the image
  numTagging++;
  visionClient.landmarkDetection({ source: { filename: imgPath} })
  .then((results) => {
    if (results[0] !== null) {
      var landmarks = results[0].landmarkAnnotations;
      Content.findOne({md5 : contentMD5}, function(err, contentItem) {
        if(err) { console.log(err); return; }
        if(contentItem === null) { console.log('Item is NULL. MD5 : ' + contentMD5); return; }
        contentItem.tags.landmarks = landmarks;

        var json = JSON.stringify(landmarks);
        fs.writeFile(path + '/tags/landmarks.json', json, 'utf8');

        contentItem.save(function (err2) {
          if(err2) { console.log(err2); return; }
          numTagging--;
          console.log('      Complete ' + numTagging.toString() + ' landmarks ' + imgPath);
          if(numTagging === 0) { process.exit(); }
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
  visionClient.imageProperties({ source: { filename: imgPath } })
  .then((results) => {
    if (results[0] !== null) {
      var colors = results[0].imagePropertiesAnnotation.dominantColors.colors;
      Content.findOne({md5 : contentMD5}, function(err, contentItem) {
        if(err) { console.log(err); return; }
        if(contentItem === null) { console.log('Item is NULL. MD5 : ' + contentMD5); return; }
        contentItem.tags.colors = colors;

        var json = JSON.stringify(colors);
        fs.writeFile(path + '/tags/colors.json', json, 'utf8');

        contentItem.save(function (err2) {
          if(err2) { console.log(err2); return; }
          numTagging--;
          console.log('      Complete ' + numTagging.toString() + ' colors ' + imgPath);
          if(numTagging === 0) { process.exit(); }
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
  visionClient.webDetection({ source: { filename: imgPath } })
  .then((results) => {
    if (results[0] !== null) {
      var webEntities = results[0].webDetection.webEntities;
      Content.findOne({md5 : contentMD5}, function(err, contentItem) {
        if(err) { console.log(err); return; }
        if(contentItem === null) { console.log('Item is NULL. MD5 : ' + contentMD5); return; }
        contentItem.tags.web = webEntities;

        var json = JSON.stringify(webEntities);
        fs.writeFile(path + '/tags/webEntities.json', json, 'utf8');

        contentItem.save(function (err2) {
          if(err2) { console.log(err2); return; }
          numTagging--;
          console.log('      Complete ' + numTagging.toString() + ' web ' + imgPath);
          if(numTagging === 0) { process.exit(); }
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
  visionClient.labelDetection({ source: { filename: imgPath } })
  .then((results) => {
    if (results[0] !== null) {
      var labels = results[0].labelAnnotations;
      Content.findOne({md5 : contentMD5}, function(err, contentItem) {
        if(err) { console.log(err); return; }
        if(contentItem === null) { console.log('Item is NULL. MD5 : ' + contentMD5); return; }
        contentItem.tags.labels = labels;

        var json = JSON.stringify(labels);
        fs.writeFile(path + '/tags/labels.json', json, 'utf8');

        contentItem.save(function (err2) {
          if(err2) { console.log(err2); return; }
          numTagging--;
          console.log('      Complete ' + numTagging.toString() + ' labels ' + imgPath);
          if(numTagging === 0) { process.exit(); }
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
    if(
      fs.existsSync('feeds/' + feeds[i] + '/' + content[j] + '/tags/landmarks.json') ||
      fs.existsSync('feeds/' + feeds[i] + '/' + content[j] + '/tags/colors.json') ||
      fs.existsSync('feeds/' + feeds[i] + '/' + content[j] + '/tags/labels.json') ||
      fs.existsSync('feeds/' + feeds[i] + '/' + content[j] + '/tags/webEntities.json')
    ) {
      console.log('feeds/' + feeds[i] + '/' + content[j] + ' has been already tagged.');
    } else {
      if(!fs.existsSync('feeds/' + feeds[i] + '/' + content[j] + '/tags')) {
        fs.mkdirSync('feeds/' + feeds[i] + '/' + content[j] + '/tags');
      }
      tag('feeds/' + feeds[i] + '/' + content[j]);
    }
  }
}
