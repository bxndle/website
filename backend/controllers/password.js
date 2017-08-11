var crypto = require('crypto');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var ResetRequest = mongoose.model('ResetRequest');

module.exports.register = function(req, res) {
  var user = new User({email : req.body.email, name : req.body.name});

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200).json({
      "token" : token
    });
    return;
  });
};

module.exports.resetRequest = function(req, res) {

  User.findOne({email : req.body.email}, function(err, user) {

    if (err) { res.status(400).send(err); return; }

    console.log(user);
    if (user != null) {
      crypto.randomBytes(48, function(err2, buffer) {
        if (err2) { res.status(400).send(err2); return; }

        var token = buffer.toString('hex');

        var newRequest = new ResetRequest({
          token: token,
          email: user.email
        });

        newRequest.save(function (err3) {
          if (err3) { res.status(400).send(err3); return; }
          res.status(200).json({
            token: token
          });
          return;
        });

      });
    } else {
      res.status(404).send('User Not Found');
    }

  });

};

module.exports.setNew = function(req, res) {
  if(!req.body.token || req.body.token.length !== 96) { res.status(400).send('Invalid token'); return; }
  ResetRequest.findOne({token : req.body.token, used: false}, function (err, resetRequest) {
    if (err) { res.status(400).send(err); return; }
    if (resetRequest == null) { res.status(404).send('Reset request not found.'); return; }

    User.findOne({email : resetRequest.email}, function (err2, user) {
      if (err2) { res.status(400).send(err2); return; }
      console.log(user.hash);
      console.log(user.salt);
      user.setPassword(req.body.password);
      console.log(user.hash);
      console.log(user.salt);

      User.update({_id : user._id}, {hash : user.hash, salt : user.salt}, function (err3) {
        if (err3) { res.status(400).send(err3); return; }
        resetRequest.used = true;

        ResetRequest.update({_id : resetRequest._id}, {used : true}, function (err4) {
          if (err4) { res.status(400).send(err4); return; }
          res.status(200).send();
        });
      });
    });
  });
};
