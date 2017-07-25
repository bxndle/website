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

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// images
router.post('/tagging', images.tagging);
router.get('/fetch', images.fetch);

// logging
router.post('/log/auth', log.auth);
router.post('/log/likes', log.likes);


module.exports = router;
