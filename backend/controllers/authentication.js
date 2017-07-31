var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');

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

module.exports.login = function(req, res) {

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      console.log(user);
      token = user.generateJwt();
      res.status(200).json({
        "token" : token
      });
      return;
    } else {
      // If user is not found
      res.status(401).json(info);
      return; 
    }
  })(req, res);

};
