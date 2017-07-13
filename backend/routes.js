var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET'
});

var ctrlProfile = require('./controllers/profile.js');
var ctrlAuth = require('./controllers/authentication.js');

var test = function (req, res, next) {
  console.log(auth);
  next();
}

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
