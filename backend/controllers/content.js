var fs = require('fs');
var mongoose = require('mongoose');
var Content = mongoose.model('Content');
var User = mongoose.model('User');

module.exports.getFeed = function(req, res) {
  fs.readFile(__dirname + '/content.json', 'utf8', function readFileCallback(err, data){
    if (err) { res.status(500).send(err); return; }
    var feeds = JSON.parse(data).feeds;
    if (feeds[req.params.feedName]) {
      res.status(200).json(feeds[req.params.feedName]);
      return;
    } else {
      res.status(404).send();
      return;
    }

  });
}

module.exports.getCategories = function(req, res) {
  fs.readFile(__dirname + '/content.json', 'utf8', function readFileCallback(err, data){
    if (err) { res.status(500).send(err); return; }
    res.status(200).json(JSON.parse(data).categories);
    return;
  });
}

module.exports.getContentItem = function(req, res) {
  Content.findOne({md5 : req.params.md5.toUpperCase()}, function(err, contentItem) {
    if (err) { res.status(500).send(err); return; }
    if (contentItem === null) { res.status(401).send('Matching content not found.'); return; }
    res.status(200).json(contentItem);
    return;
  });
}

// Speed up calls to hasOwnProperty
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

module.exports.action = function(req, res, next) {
  if (!req.body.email||
      !req.body.contentID||
      !req.body.action ||
      !req.body.feedName) {
        res.status(400).send('ERROR: missing required parameters.');
  }

  User.findOne({email : req.body.email}, function (err, user) {
    if(err || user === null) { res.status(404).send('User not found'); return; }

    Content.findOne({md5 : req.body.contentID}, function (err2, content) {
      if(err2 || content === null) { res.status(404).send('Media content not found'); return; }

      if(req.body.action === 'SAVE') {
        console.log('SAVE');
        if(!user._doc.hasOwnProperty('saves')) { user.saves = {}; }
        if(!user.saves.hasOwnProperty(req.body.feedName)) { user.saves[req.body.feedName] = {}; }
        if(!user.saves[req.body.feedName].hasOwnProperty(req.body.contentID)) {
          user.saves[req.body.feedName][req.body.contentID] = { md5: req.body.contentID };
        }

        User.findOneAndUpdate({_id : user._id}, { $set: {saves : user.saves}}, function (err3, user) {
          if(err3 || content === null) { res.status(500).send("ERROR: Can't update user object"); return; }
          next();
        });
      } else if (req.body.action === 'REMOVE') {
        console.log('REMOVE');
        if(!user._doc.hasOwnProperty('saves') ||
           !user.saves.hasOwnProperty(req.body.feedName) ||
           !user.saves[req.body.feedName].hasOwnProperty(req.body.contentID)) {
          res.status(400).send('ERROR: Content not previously saved');
          return;
        }

        delete user.saves[req.body.feedName][req.body.contentID];

        if(isEmpty(user.saves[req.body.feedName])) {
          delete user.saves[req.body.feedName];
        }

        User.findOneAndUpdate({_id : user._id}, { $set: {saves : user.saves}}, function (err3, user) {
          if(err3 || content === null) { res.status(500).send("ERROR: Can't update user object"); return; }
          next();
        });
      } else { res.status(404).send('ERROR: Invalid action'); return; }
    });

  });

}

module.exports.getSaves = function(req, res, next) {
  if (!req.params.userID||
      !req.params.feedName) {
        res.status(400).send('ERROR: missing required parameters.');
        return;
  }

  User.findOne({_id : req.params.userID}, function (err, user) {
    if(err || user === null) { res.status(404).send('User not found'); return; }
    if(user._doc.hasOwnProperty('saves')) {
      if(req.params.feedName === 'ALL') {
        res.status(200).json(user.saves);
        return;
      } else if(user.saves.hasOwnProperty(req.params.feedName)) {
        res.status(200).json(user.saves[req.params.feedName]);
        return;
      } else {
        res.status(200).json({});
        return;
      }
    } else {
      res.status(200).json({});
      return;
    }
  });

}
