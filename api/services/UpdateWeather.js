var Promise = require("bluebird"),
    request = Promise.promisify(require("request")),
    moment  = require('moment');

Promise.longStackTraces();


var Updater = function updateWeather(gauge, callback) {


  this.saveWeather = function(metric) {
    return Weather.create(metric);
  };


  this.request = function() {
    var self = this;

    return request({
      url: 'https://api.forecast.io/forecast/'+sails.config.forecastIO.apiKey+'/'+this.gauge.latitude+','+this.gauge.longitude,
      gzip: true
    })
    .then(function(result) {
      var data = JSON.parse(result[0].body);

      data['gauge'] = self.gauge.id;
      return data;
    });
  };


  this.prune = function() {

    return Weather.destroy({gauge: this.gauge.id});
  };


  this.run = function() {
    var self = this;

    return this.request()
    .then(function(data) {

      return self.prune()
      .then(function() {
        return data;
      });

    })
    .then(function(data) {
      return self.saveWeather(data);
    })
    .done();
  }

};


function WeatherUpdater(gauge) {

  this.gauge = gauge;
};


WeatherUpdater.prototype = new Updater();

module.exports = WeatherUpdater;
