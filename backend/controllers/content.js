var fs = require('fs');

module.exports.getFeeds = function(req, res) {
  fs.readFile(__dirname + '/content.json', 'utf8', function readFileCallback(err, data){
      if (err){
          console.log(__dirname);
          res.status(500).send(err);
          return;
      } else {
      res.status(200).json(JSON.parse(data));
      return;
  }});
}
