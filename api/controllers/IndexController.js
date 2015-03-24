/**
 * IndexController
 *
 * @description :: Server-side logic for managing indices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Promise = require("bluebird");

module.exports = {

  index: function(req, res, next) {
    res.view({
      title: 'Home',
      bodyClasses: 'home'
    });
  },

  swatches: function(req, res, next) {
    res.view({
      title: 'swatches',
      bodyClasses: 'swatches'
    });
  },

  cron: function(req, res, next) {

    Promise.all([
      UpdateMeasurements.run(),
      UpdatePredictions.run(),
      UpdateWeather.run()
    ])
    .then(function() {

      return Gauge.find()
    })
    .map(function(gauge) {

      return Gauge.update({id:gauge.id}, {updatedAt: new Date()});
    })
    .then(function() {

      console.log('Cron Update Complete');
      res.send();
    })
    .catch(function(err) {

      console.log(err);
    });
  }
};

