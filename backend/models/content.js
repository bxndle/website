var mongoose = require('mongoose');

var contentSchema = new mongoose.Schema({
  md5: {
    type: String,
    unique: true,
    uppercase: true,
    required: true,
    maxlength: 32,
    minlength: 32
  },
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    lat: {type: Number, min: -90, max: 90 },
    lon: {type: Number, min: -180, max: 180 }
  },
  url: String,
  sourceName: {
    type: String,
    required: true
  },
  labels: {
    type: [],
    required: true
  },
  web: {
    type: [],
    required: true
  },
  landmarks: {
    type: [],
    required: false
  }
});

mongoose.model('Content', contentSchema);
