var mongoose = require('mongoose');
var LogAuth = mongoose.model('LogAuth');
var LogSaves = mongoose.model('LogSaves');
var User = mongoose.model('User');
var Content = mongoose.model('Content');

module.exports.auth = function(req, res) {
  if (!req.body.email||
      !req.body.action) {
        res.status(400).send('ERROR: missing required parameters.');
        return;
  }

  User.findOne({email : req.body.email}, function (err, users) {
    if(err || users === null) { res.status(404).send('ERROR: User not found'); return; }
  });

  var authEntry = new LogAuth({
    email : req.body.email,
    action : req.body.action
  });

  authEntry.save(function(err) {
    if (err) { res.status(403).send(err); }
    else { res.status(200).send(); }
  });
}

module.exports.saves = function(req, res, next) {
  if (!req.body.email||
      !req.body.contentID||
      !req.body.action) {
        console.log(req.body);
        res.status(400).send('ERROR: missing required parameters.');
        return;
  }

  if(!(req.body.action === 'SAVE' || req.body.action === 'REMOVE')) { res.status(400).send('ERROR: Invalid action.'); return; }

  User.findOne({email : req.body.email}, function (err, users) {
    if(err || users === null) { res.status(404).send('ERROR: User not found'); return; }

    Content.findOne({md5 : req.body.contentID}, function (err2, content) {
      if(err2 || content === null) { res.status(404).send('ERROR: Media content not found'); return; }

      var saveEntry = new LogSaves({
        email : req.body.email,
        contentID : req.body.contentID,
        action : req.body.action
      });

      saveEntry.save(function(err3) {
        if (err3) { res.status(400).send(err); return; }
        else { res.send(200); }
      });
    });
  });
}
