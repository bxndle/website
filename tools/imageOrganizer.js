var AWS = require('aws-sdk');
var fs = require('fs');
var md5 = require('md5-file');
var mongoose = require('mongoose');

require('../backend/db.js');
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
    Body: imageFile,
    ACL: 'public-read'
  };

  // s3.headObject({ Bucket : s3Bucket, Key : path }, function (err, data) {
  //   if(data === null || err !== null) {
      s3.putObject(uploadParams, function(err, data) {
        if (err) { console.log('ERROR: ' + err); return;}
        if (data === null) {
          console.log('no data' + numUploading.toString() + ' ' + path);
          numUploading--;
          return;
        }
        numUploading--;
        console.log('      Set ACL ' + numUploading.toString() + ' ' + path);
        if(numUploading === 0) { process.exit() }
        return;
      });
    // } else {
    //   numUploading--;
    //   console.log('      Did not upload ' + numUploading.toString() + ' ' + path);
    //   if(numUploading === 0) { process.exit() }
  //   }
  // });

  return 'https://s3.us-east-2.amazonaws.com/' + s3Bucket + '/' + path;
}

var fillFeed = function (feedName) {
  var desc = fs.readFileSync('feeds/' + feedName + '/description.txt', 'utf8');

  if(desc.length > 140) {
    desc = desc.slice(0,130) + '...';
  }

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
      content[i] === 'background.jpg' ||
      content[i] === 'description.txt'
    ) { continue; }

    if (
      !fs.existsSync('feeds/' + feedName + '/' + content[i] + '/content.jpg') ||
      !fs.existsSync('feeds/' + feedName + '/' + content[i] + '/source.txt')
    ) {
      console.error('\n\nMissing files from feeds/' + feedName + '/' + content[i] + '\n');
      process.exit();
    }

    var filepath = 'feeds/' + feedName + '/' + content[i] + '/content.jpg';
    var url = uploadToAWS(filepath);
    var contentMD5 = md5.sync(filepath);
    feedItem.content.push(contentMD5);

    var infoSourceFile = fs.readFileSync('feeds/' + feedName + '/' + content[i] + '/source.txt', 'utf8').split('\n\n');

    var location = infoSourceFile[1].split('_');
    var locationUrl = 'https://www.google.com/maps/search/?api=1&query=' + location[0];
    if(location.length === 4) {
      locationUrl = location[2];
    }

    // if(fs.existsSync('feeds/' + feedName + '/' + content[i] + '/url.txt')) {
    //   url = fs.readFileSync('feeds/' + feedName + '/' + content[i] + '/url.txt').slice(0,-1);
    // }

    var source = infoSourceFile[0].split('_');

    var contentDesc = infoSourceFile[2].split('_');

    if(contentDesc.length > 140) {
      contentDesc = contentDesc.slice(0,137) + '...';
    }

    var bundleTags = infoSourceFile[3].split(', ');

    for(tag in bundleTags) {
      bundleTags[tag] = bundleTags[tag].replace(/[^0-9a-zA-Z]/g, '');
      bundleTags[tag] = bundleTags[tag].replace(/\r?\n|\r/g, '');
    }

    var coords = location[0].split(',');

    var contentItem = {
      type : 'IMG',
      md5 : contentMD5.toString().toUpperCase(),
      location : {
        lat : coords[0],
        lon : coords[1],
        name : location[1],
        url : locationUrl
      },
      url : url,
      source : {
        posterName : source[0],
        profileURL : 'https://s3.us-east-2.amazonaws.com/' + s3Bucket + '/sources/' + source[1].toLowerCase() + '.jpg',
        sourceName : source[1],
        redirectURL : source[2]
      },
      description : contentDesc,
      bundleTags : bundleTags,
      tags : {
        web : [],
        labels : [],
        landmarks : [],
        colors : []
      }
    };


    Content.findOneAndUpdate({'md5' : contentMD5.toString().toUpperCase()}, contentItem, {upsert : true}, function(err, savedContent) {
      if (err) {
        console.log(err); return;
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
