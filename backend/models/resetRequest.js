var mongoose = require('mongoose');

var resetRequestSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },
  token: {
    type: String,
    unique: true,
    required: true
  },
  used: {
    type: Boolean,
    default: false,
    required: true
  }
});

resetRequestSchema.methods.use = function () {
  this.used = true;
}

mongoose.model('ResetRequest', resetRequestSchema);
