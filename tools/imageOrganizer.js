var AWS = require('aws-sdk');
var fs = require('fs');
var md5 = require('md5-file');
var mongoose = require('mongoose');

require('../backend/models/db.js');
require('../backend/models/content.js');
var Content = mongoose.model('Content');

// Bucket names must be unique across all S3 users

var s3Bucket = 'bundle-feed-storage';
var s3 = new AWS.S3();

var contentStruture = {
  feeds : {},
  categories : {}
};

numUploading = 0;

var uploadToAWS = function (path) {
  numUploading++;
  console.log('    Uploading: ' + path);
  var imageFile = fs.readFileSync(path);

  uploadParams = {
    Bucket: s3Bucket,
    Key: path,
    Body: imageFile
  };

  aclParams = {
    Bucket: s3Bucket,
    Key: path,
    ACL: 'public-read'
  };

  // // Upload with progress
  // var upload = s3.upload(uploadParams)
  // .on('httpUploadProgress', function(evt) {
  //   console.log('Progress:', evt.loaded, '/', evt.total);
  // })
  // .send(function(err, data) {
  //   console.log(err, data);
  //   s3.putObjectAcl(aclParams, function(err, data) {
  //     if (err) { console.log('ERROR: ' + err) };
  //   });
  // });

  s3.putObject(uploadParams, function(err, data) {
    if (err) { console.log('ERROR: ' + err); return;}
    s3.putObjectAcl(aclParams, function(err, data) {
      if (err) { console.log('ERROR: ' + err) };
      numUploading--;
      console.log('      Set ACL ' + numUploading.toString() + ' ' + path);
      return;
    });
  });

  return 'https://s3.us-east-2.amazonaws.com/' + s3Bucket + '/' + path;
}

var fillFeed = function (feedName) {
  var desc = fs.readFileSync('feeds/' + feedName + '/description.txt', 'utf8');

  var feedItem = {
    name : feedName,
    src : uploadToAWS('feeds/' + feedName + '/' + feedName + '.jpg'),
    background : uploadToAWS('feeds/' + feedName + '/' + 'background.jpg'),
    content : [],
    description : desc
  };

  var content = fs.readdirSync('feeds/' + feedName);

  for(var i = 0; i < content.length; i++) {
    if(content[i] === '.DS_Store' ||
      content[i] === feedName + '.jpg' ||
      content[i] === 'background.jpg'||
      content[i] === 'description.txt'
    ) { continue; }
    var filepath = 'feeds/' + feedName + '/' + content[i];
    var url = uploadToAWS(filepath);
    var contentMD5 = md5.sync(filepath);
    feedItem.content.push(contentMD5);

    var infoArray = content[i].split('_');
    var info = {
      lat : Number(infoArray[0]),
      lon : Number(infoArray[1]),
      locationName : infoArray[2],
      sourceName : infoArray[3]
    };

    var contentItem = new Content({
      type : 'IMG',
      md5 : contentMD5,
      url : url,
      source : {
        name : info.sourceName,
        logoURL : 'https://s3.us-east-2.amazonaws.com/' + s3Bucket + '/sources/' + info.sourceName + '.jpg'
      },
      locationName : info.locationName,
      location : {
        lat : info.lat,
        lon : info.lon
      },
      web : [],
      labels : [],
      landmarks : [],
      colors : []
    });

    contentItem.save(function(err, savedContent) {
      if (err) {
        console.log(err);
        return;
      }
      return;
    });
  }

  contentStruture.feeds[feedName] = feedItem;

  console.log(feedName + ' feed created');
  return;
}

var makeFeeds = function () {
  var feedList = fs.readdirSync('feeds');

  for(var i = 0; i < feedList.length; i++) {
    if(feedList[i] === '.DS_Store') { continue; }
    fillFeed(feedList[i]);
  }
  return;
}

var fillCategory = function (categoryName) {
  var categoryObj = {
    name : categoryName,
    feeds : [],
    src : 'https://s3.us-east-2.amazonaws.com/' + s3Bucket + '/categories/' + categoryName + '/' + categoryName + '.jpg'
  };

  uploadToAWS('categories/' + categoryName + '/' + categoryName + '.jpg');

  var feedList = fs.readdirSync('categories/' + categoryName + '/feeds');

  for(var i = 0; i < feedList.length; i++) {
    if(feedList[i] === '.DS_Store') { continue; }
    var condensedFeedItem = {
      name : contentStruture.feeds[feedList[i]].name,
      src : contentStruture.feeds[feedList[i]].src
    }
    categoryObj.feeds.push(condensedFeedItem);
  }

  return categoryObj;
}

makeFeeds();
var categories = fs.readdirSync('categories');

for(var i = 0; i < categories.length; i++) {
  if(categories[i] === '.DS_Store') { continue; }
  contentStruture.categories[categories[i]] = fillCategory(categories[i]);
}

// Write data to file
console.log('Writing JSON...');
var json = JSON.stringify(contentStruture);
fs.writeFile('../backend/controllers/content.json', json, 'utf8');
console.log('Done writing JSON');
console.log('IMPORTANT:: ACL and TAGS must decrement to 0!!!');
