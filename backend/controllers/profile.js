var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {
  if (!req.user._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
    return; 
  } else {
    User
      .findOne({'email' : req.user.email}, function(err, user) {
        console.log(req.user._id);
        console.log(user.id);
        res.status(200).json(user);
        return;
      });
  }

};
