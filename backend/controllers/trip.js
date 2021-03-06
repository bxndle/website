var mongoose = require('mongoose');
var Trip = mongoose.model('Trip');

module.exports.create = function(req, res) {

  if(req.body.content.length === 0) { res.status(400).send('No content, no trip'); return; }

  var trip = new Trip();

  trip.content = [];

  for(md5 in req.body.content) {
    if(req.body.content.hasOwnProperty(md5)) {
      trip.content.push(md5);
    }
  }

  trip.owner = mongoose.Types.ObjectId(req.body.userID.toString());
  trip.participants = [];
  trip.location = req.body.location;
  trip.coverPic = req.body.content[Object.keys(req.body.content)[0]].url;

  trip.save(function (err, trip) {
    if(err) { console.log(err); res.status(500).send(err); return; }
    if(trip === null) { res.status(500).send('Trip is NULL'); return; }
    res.status(200).send(trip);
  });
};

module.exports.addParticipant = function(req, res) {
  Trip.findOneAndUpdate({_id : mongoose.Types.ObjectId(req.body.tripID)}, { '$push' : { participants : mongoose.Types.ObjectId(req.body.participantID) }}, function (err, trip) {
    if(err || trip === null) { res.status(404).send('Trip not found'); return; }

    res.status(200).send();
    return;
  });
}

module.exports.setName = function(req, res) {
  Trip.findOneAndUpdate({_id : mongoose.Types.ObjectId(req.body.tripID)}, {name : req.body.name}, function(err, trip) {
    if(err || trip === null) { res.status(404).send('Trip not found'); return; }
    res.status(200).send();
    return;
  })
};

module.exports.getTrip = function(req, res) {
  Trip.findOne({_id : mongoose.Types.ObjectId(req.params.tripID)}, function(err, trip) {
    if(err || trip === null) { res.status(404).send('Trip not found'); return; }
    res.status(200).send(trip);
    return;
  })
};

module.exports.getAllTrips = function(req, res) {
  Trip.find({owner : mongoose.Types.ObjectId(req.params.userID)}, function(err, trips) {
    if(err) { res.status(404).send(err); return; }

    Trip.find({participants : { $elemMatch : { $eq : req.params.userID }}}, function(err2, trips2) {
      if(err2) { res.status(404).send(err2); return; }

      var returnItem = [];
      if(trips !== null) {
        returnItem.push.apply(returnItem, trips);
      }
      if(trips2 !== null) {
        returnItem.push.apply(returnItem, trips2);
      }

      res.status(200).send(returnItem);
      return;
    });
  })
};
