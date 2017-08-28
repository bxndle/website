var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET'
});

var ctrlProfile = require('./controllers/profile.js');
var ctrlAuth = require('./controllers/authentication.js');
var log = require('./controllers/log.js');
var pass = require('./controllers/password.js');
var content = require('./controllers/content.js');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.get('/user/saves/:userID/:feedName', content.getSaves);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// logging
router.post('/log/auth', log.auth);

// password reset
router.post('/reset/request', pass.resetRequest);
router.post('/reset/set', pass.setNew);

// content
router.get('/content/feed/:feedName', content.getFeed);
router.get('/content/categories', content.getCategories);
router.get('/content/item/:md5', content.getContentItem);
router.post('/content/action', content.action, log.saves);


// 404 error
router.all('/*', function(req, res) {
  res.status(404).send();
  return;
});

module.exports = router;
