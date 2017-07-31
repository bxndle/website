var mongoose = require('mongoose');

var contentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    match : /IMG|VID/
  },
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
  source: {
    name: {type: String, required: true},
    logoURL: {type: String, required: true}
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
  },
  totalLikes: {
    type: Number,
    default: 0
  },
  users: {}
});

mongoose.model('Content', contentSchema);
