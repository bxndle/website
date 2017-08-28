var mongoose = require('mongoose');

var contentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    match: /IMG|VID/
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
    lat: { type: Number, min: -90, max: 90, required: true },
    lon: { type: Number, min: -180, max: 180, required: true },
    url: { type: String },
    name: { type: String, required: true }
  },
  url: {
    type: String,
    required: true
  },
  source: {
    posterName: { type: String, required: true },
    profileURL: { type: String, required: true },
    sourceName: { type: String, required: true },
    redirectURL: { type: String, required: true }
  },
  description: {
    type: String,
    required: true,
    maxlength: 140
  },
  tags: {
    labels: { type: [] },
    web: { type: [] },
    landmarks: { type: [] },
    colors: { type: [] },
    bundle: { type: [] }
  }
  // totalLikes: {
  //   type: Number,
  //   default: 0
  // },
  // users: {}
});

mongoose.model('Content', contentSchema);
