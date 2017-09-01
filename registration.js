module.exports = function(models) {
  const home_screen = function(req, res) {
    res.render('addRegNumber');
  }

  const index = function(req, res, done) {
    var reg_number = req.body.regPlate;
    var dbreg = {
      numberPlates: req.body.regPlate
    }

    if (!reg_number) {
      // req.flash('error', 'textbox empty');
      res.render("addRegNumber");
    } else {
      models.Registration.findOne({
        numberPlates: req.body.regPlate
      }, function(err, results) {
        if (err) {
          return done(err)
        }
        // console.log(results);
      })

      models.Registration.create({
        numberPlates: req.body.regPlate.toUpperCase()
      }, function(err, results) {
        if (err) {
          return done(err)
        }

        if (results) {
          models.Registration.find({},
            function(err, results) {
              if (err) {
                return done(err)
              }
              var data = {
                plates: results
              }
              console.log(results);
              res.render('addRegNumber', data)
            })
        }

      })

    }
  }

  const filterAll = function(req, res, done) {
    var plate = req.body.plate

    models.Registration.find({
        numberPlates: {
          '$regex': '.*' + plate
        }
      },
      function(err, results) {
        if (err) {
          return done(err)
        }
        res.render('addRegNumber', {
          filter: results
        })

      })
  }

  const showAll = function(req, res, done) {
    var reg_number = req.body.regPlate
    models.Registration.find({},
       function(err,results) {
         if (err) {
           return done(err)

         }
  res.render('addRegNumber',{filter: results})
    })
  }

  const reset = function (req, res, done) {
    models.Registration.remove({},
    function (err) {
      if (err) {
        return done(err)
      }
res.render('addRegNumber')
    })
  }
  return {
    home_screen,
    index,
    filterAll,
    showAll,
    reset
  }
}
