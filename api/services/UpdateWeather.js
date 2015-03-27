var Promise = require("bluebird"),
    request = Promise.promisify(require("request")),
    moment  = require('moment');

module.exports = {


  _fetchGauges: function() {
    return Gauge.find({where: {status: 'on'}});
  },


  _saveWeather: function(metric) {

    return Weather.create(metric);
  },


  _request: function(gauge) {
    var _this = this;

    return request({
      url: 'https://api.forecast.io/forecast/'+sails.config.forecastIO.apiKey+'/'+gauge.latitude+','+gauge.longitude,
      gzip: true
    })
    .then(function(result) {
      console.log(result);
      var data = JSON.parse(result[0].body);

      data['gauge'] = gauge.id;
      return data;
    });
  },


  _prune: function() {

    return Weather.destroy();
  },


  run: function() {
    var _this = this;

    return this._prune()
    .then(function() {
      return _this._fetchGauges();
    })
    .then(function(gauges) {
      return Promise.map(gauges, _this._request);
    })
    .map(function(data) {
      return _this._saveWeather(data);
    })
    .catch(function(err) {
      console.log(err);
    });
  },


  update: function(gauge) {
    var _this = this;

    return this._request(gauge)
    .then(function(data) {
      return _this._saveWeather(data);
    });
  }
};
