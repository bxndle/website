const express = require('express')
const app = express()

var bodyParser = require('body-parser'),
    multer = require('multer'), // v1.0.5
    upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/test_signup', function (req, res) {
  console.log('test:');
  console.log(req.body);
  res.json(req.body);
})

app.get('/test_login', function (req, res) {
  res.send('hello world');

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
