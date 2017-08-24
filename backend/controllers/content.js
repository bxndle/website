var fs = require('fs');
var mongoose = require('mongoose');
var Content = mongoose.model('Content');

module.exports.getFeed = function(req, res) {
  fs.readFile(__dirname + '/content.json', 'utf8', function readFileCallback(err, data){
    if (err) { res.status(500).send(err); return; }
    var feeds = JSON.parse(data).feeds;
    if (feeds[req.params.feedName]) {
      res.status(200).json(feeds[req.params.feedName]);
      return;
    } else {
      res.status(404).send();
      return;
    }

  });
}

module.exports.getCategories = function(req, res) {
  fs.readFile(__dirname + '/content.json', 'utf8', function readFileCallback(err, data){
    if (err) { res.status(500).send(err); return; }
    res.status(200).json(JSON.parse(data).categories);
    return;
  });
}

module.exports.getContentItem = function(req, res) {
  Content.findOne({md5 : req.params.md5.toUpperCase()}, function(err, contentItem) {
    if (err) { res.status(500).send(err); return; }
    if (contentItem === null) { res.status(401).send('Matching content not found.'); return; }
    res.status(200).json(contentItem);
    return;
  });
}
