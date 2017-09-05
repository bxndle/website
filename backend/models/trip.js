var mongoose = require('mongoose');

var tripSchema = new mongoose.Schema({
  content: {
    type: [],
    required: true,
    unique: false
  },
  name: {
    type: String,
    default: 'My trip',
    unique: false
  },
  startDate : {
    type: Date,
    unique: false,
    required: false
  },
  endDate : {
    type: Date,
    unique: false,
    required: false
  },
  owner : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    reuired: [true,'No user id found'],
    unique: false
  },
  participants : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    reuired: [true,'No user id found'],
    unique: false
  }],
  location: {
    lat: { type: Number, min: -90, max: 90, required: true },
    lon: { type: Number, min: -180, max: 180, required: true }
  },
  coverPic : {
    type: String,
    required: true
  },
});

mongoose.model('Trip', tripSchema);
