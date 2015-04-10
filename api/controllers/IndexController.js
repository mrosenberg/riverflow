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


  about: function(req, res, next) {
    res.view({
      title: 'about',
      bodyClasses: 'about'
    });
  },


  swatches: function(req, res, next) {
    res.view({
      title: 'swatches',
      bodyClasses: 'swatches'
    });
  },


  cron: function(req, res, next) {

    Gauge.find({where: {status: 'on'}})
    .then(function(gauges) {

      return Promise.map(gauges, function(gauge) {
        return new UpdateWeather(gauge).run();
      })
      .then(function() {
        return gauges;
      });

    })
    .then(function(gauges) {

      return Promise.map(gauges, function(gauge) {
        return new UpdatePredictions(gauge).run();
      })
      .then(function() {
        return gauges;
      });

    })
    .then(function(gauges) {

      return Promise.map(gauges, function(gauge) {
        return new UpdateMeasurements(gauge).run();
      })
      .then(function() {
        return gauges;
      });

    })
    .then(function(gauges) {
      return Promise.map(gauges, function(gauge) {
        Gauge.update(gauge.id, {
          updatedAt: new Date()
        }, function(err, results) {});
      });
    })
    .then(function() {
      console.log('Cron Update Complete');
      res.send();
    })
    .done()
  }
};

