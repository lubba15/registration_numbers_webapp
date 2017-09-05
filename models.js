const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/addRegNumber";

mongoose.connect(mongoURL, {
      useMongoClient: true
    }, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Database ready to run!!!');
        }
      });
    const Registration = mongoose.model('Registration', {
      numberPlates: String
    });

    module.exports = Registration;
