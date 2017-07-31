var mongoose = require('mongoose');
var Content = mongoose.model('Content');
var User = mongoose.model('User');

module.exports.tag = function(req, res) {

  var web = [],
      labels = [];

  if(!req.body.webDetection ||
     !req.body.webDetection.webEntities ||
     !req.body.labelAnnotations ||
     !req.body.url ||
     !req.body.md5) {
    res.status(400).send('ERROR: missing required parameters.');
    return;
  }

  for (var i = 0; i < req.body.webDetection.webEntities.length; i++) {
    entry = req.body.webDetection.webEntities[i];
    if(entry.score > 0.1) {
      web.push({
        description : entry.description,
        score : entry.score
      });
    }
  }

  for (var i = 0; i < req.body.labelAnnotations.length; i++) {
    entry = req.body.labelAnnotations[i];
    if(entry.score > 0.1) {
      labels.push({
        description : entry.description,
        score : entry.score
      });
    }
  }

  if (req.body.md5.length !== 32) {
    res.status(400).send('ERROR: improper MD5 length.');
    return;
  }

  var content = new Content({
    type : 'IMG',
    md5 : req.body.md5,
    url : req.body.url,
    source : {name: 'Bundle', logoURL: 'http://joinbundle.com/bundle500x200.png'},
    web : web,
    labels : labels,
    // users : {
    //   0 : false
    // }
  });

  if(req.body.hasOwnProperty('landmarkAnnotations')){
    for (var i = 0; i < req.body.landmarkAnnotations; i++) {
      entry = req.body.landmarkAnnotations[i];
      if(entry.score > 0.1) {
        content.landmarks.push({
          description : entry.description,
          score : entry.score
        });
      }
    }
  }

  // enter location

  content.save(function(err) {
    if (err) {
      res.status(400).send(err);
      return;
    }
    console.log(content);
    res.send();
    return;
  });

};


module.exports.fetch = function(req, res) {
  Content.find({}, function(err, contents) {
    var content = [];

    contents.forEach(function(entry) {
      var returnEntry = {
        md5 : entry.md5,
        source : entry.source,
        url : entry.url,
        type : entry.type,
        users : entry.users,
        totalLikes : entry.totalLikes
      }
      content.push(returnEntry);
    });

    res.send(content);
  });
}

module.exports.likes = function(req, res) {
  if (!req.body.userID||
      !req.body.contentID||
      !req.body.action) {
        console.log(req.body);
        res.status(400).send('ERROR: missing required parameters.');
        return;
  }

  User.findOne({_id : req.body.userID}, function (err, user) {
    if(err || user === null) { res.send('User not found'); return; }
  });

  Content.findOne({md5 : req.body.contentID}, function (err, content) {
    if(err || content === null) { res.status(404).send('Media content not found'); return; }
  });

  Content.findOne({md5 : req.body.contentID}, function(err, contentEntry) {
          if (err) { res.status(400).send(err); return; }
          else {
            if(!contentEntry.users) { contentEntry.users = {}; }
            contentEntry.users[req.body.userID] = (req.body.action === 'LIKE');

            Content.update({ md5 : contentEntry.md5 }, contentEntry, function (err) {
              if (err) { res.status(400).send(err); return; }
              else { res.status(200).send(); return; }
            });
          }
        });
}
