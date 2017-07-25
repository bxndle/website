var mongoose = require('mongoose');
var LogAuth = mongoose.model('LogAuth');
var LogLikes = mongoose.model('LogLikes');
var User = mongoose.model('User');
var Content = mongoose.model('Content');

module.exports.auth = function(req, res) {
  if (!req.body.email||
      !req.body.action) {
        res.status(400).send();
  }

  User.findOne({email : req.body.email}, function (err, users) {
    if(err || users === null) { res.status(404).send('User not found'); }
  });

  var authEntry = new LogAuth({
    userID : req.body.email,
    action : req.body.action
  });

  authEntry.save(function(err) {
    if (err) { res.status(400).send(err); }
    else { res.status(200).send(); }
  });
}

module.exports.likes = function(req, res) {
  if (!req.body.email||
      !req.body.contentID||
      !req.body.action) {
        res.status(400).send();
  }

  User.findOne({email : req.body.email}, function (err, users) {
    if(err || users === null) { res.status(404).send('User not found'); }
  });

  Content.findOne({md5 : req.body.contentID}, function (err, content) {
    if(err || content === null) { res.status(404).send('Media content not found'); }
  });

  var likesEntry = new LogLikes({
    userID : req.body.email,
    contentID : req.body.contentID,
    action : req.body.action
  });

  likesEntry.save(function(err) {
    if (err) { res.status(400).send(err); }
    else { res.status(200).send(); }
  });
}
