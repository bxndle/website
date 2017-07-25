var mongoose = require('mongoose');
var Content = mongoose.model('Content');

module.exports.tagging = function(req, res) {

  var web = [],
      labels = [];

  if(!req.body.webDetection ||
     !req.body.webDetection.webEntities ||
     !req.body.labelAnnotations ||
     !req.body.url ||
     !req.body.md5) {
    res.status(400);
    res.send('ERROR: missing required info.');
  }

  for (var i = 0; i < req.body.webDetection.webEntities.length; i++) {
    entry = req.body.webDetection.webEntities[i];
    if(entry.score > 0.1) {
      web.push({
        desc : entry.description,
        score : entry.score
      });
    }
  }

  for (var i = 0; i < req.body.labelAnnotations.length; i++) {
    entry = req.body.labelAnnotations[i];
    if(entry.score > 0.1) {
      labels.push({
        desc : entry.description,
        score : entry.score
      });
    }
  }

  if (req.body.md5.length !== 32) {
    res.status(400).send('ERROR: improper MD5 length.');
  }

  var content = new Content({
    md5 : req.body.md5,
    url : req.body.url,
    sourceName : 'Bundle',
    web : web,
    labels : labels
  });

  if(req.body.hasOwnProperty('landmarkAnnotations')){
    for (var i = 0; i < req.body.landmarkAnnotations; i++) {
      entry = req.body.landmarkAnnotations[i];
      if(entry.score > 0.1) {
        content.landmarks.push({
          desc : entry.description,
          score : entry.score
        });
      }
    }
  }

  // enter location

  content.save(function(err) {
    if (err) {
      res.status(400);
      res.send(err);
    }
    console.log(content);
    res.send();
  });

};


module.exports.fetch = function(req, res) {
  Content.find({}, function(err, contents) {
    var content = [];

    contents.forEach(function(entry) {
      content.push(entry);
    });

    res.send(content);
  });
}
