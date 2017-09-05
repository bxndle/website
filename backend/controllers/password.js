var crypto = require('crypto');
var mongoose = require('mongoose');
var postmark = require('postmark');
var User = mongoose.model('User');
var ResetRequest = mongoose.model('ResetRequest');

module.exports.resetRequest = function(req, res) {

  User.findOne({email : req.body.email}, function(err, user) {

    if (err) { res.status(400).send(err); return; }
    if (user === null) { res.status(404).send('User Not Found'); return;}

    crypto.randomBytes(48, function(err, buffer) {
      if (err) { res.status(400).send(err); return; }

      var token = buffer.toString('hex');

      var newRequest = new ResetRequest({
        token: token,
        email: user.email
      });

      newRequest.save(function (err2) {
        if (err2) { res.status(400).send(err2); return; }

        var client = new postmark.Client('a241e82a-c8f7-47dd-90a1-42da55888cd2');

        client.sendEmail({
          'From': 'mihai@joinbundle.com',
          'To': user.email,
          'Subject': 'Bundle Password Reset',
          'TextBody': 'Hi ' + user.name + ", \n\n\
We've received a request to reset your Bundle password. Please follow this link to reset your password:\n\n\
http://joinbundle.com/reset/" + token + "\n\n\
If you did not request a password reset, please reply to this email.\n\n\
All the best,\n\
Mihai"
        },
        function(error, result) {
          if(error) {
            res.status(400).send('Unable to send via postmark: ' + error.message);
          } else {
            res.status(200).send();
          }
        });
      });
    });

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
