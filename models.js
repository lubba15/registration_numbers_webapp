const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
  mongoose.connect(mongoUrl);

  const Registration = mongoose.model('Registration', {
    numberPlates: String
  });

  return {
    Registration
  }
}
