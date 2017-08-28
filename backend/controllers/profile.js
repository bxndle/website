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
        var shorthandInfo = {
          email : user.email,
          name : user.name,
          id : user._id
        };
        res.status(200).json(shorthandInfo);
        return;
      });
  }

};
