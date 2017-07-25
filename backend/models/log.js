var mongoose = require('mongoose');

var authSchema = new mongoose.Schema({
  time: {
    type: Date,
    default: Date.now,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true,
    match : /LOGIN|LOGOUT/
  }
});

var likesSchema = new mongoose.Schema({
  time: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: true
  },
  // Use the MD5 of each image or the MD5 of the 10th video frame.
  contentID: {
    type: String,
    uppercase: true,
    required: true,
    maxlength: 32,
    minlength: 32
  },
  action: {
    type: String,
    required: true,
    match : /LIKE|UNLIKE/
  }
});

mongoose.model('LogAuth', authSchema);
mongoose.model('LogLikes', likesSchema);
