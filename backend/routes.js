var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET'
});

var ctrlProfile = require('./controllers/profile.js');
var ctrlAuth = require('./controllers/authentication.js');
var images = require('./controllers/images.js');
var log = require('./controllers/log.js');
var pass = require('./controllers/password.js');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// images
router.post('/content/tag', images.tag);
router.get('/content/fetch', images.fetch);


// logging
router.post('/log/auth', log.auth);
router.post('/log/likes', log.likes, images.likes);

// password reset
router.post('/reset/request', pass.resetRequest);
router.post('/reset/set', pass.setNew);


// 404 error
router.all('/*', function(req, res) {
  res.status(404).send();
  return;
});

module.exports = router;
