var Promise = require("bluebird"),
    request = Promise.promisify(require("request")),
    moment  = require('moment');

module.exports = {


  _fetchGauges: function() {

    return Gauge.find({where: {status: 'on'}});
  },


  _saveMeasurement: function(metric) {

    return Measurement.create({
      gauge: metric._parent.id,
      dateTime: metric.values[0].value[0].dateTime,
      variableID: metric.variable.variableCode[0].variableID,
      variableName: metric.variable.variableName,
      variableDescription: metric.variable.variableDescription,
      value: metric.values[0].value[0].value,
      unitAbbreviation: metric.variable.unit.unitAbbreviation
    });
  },


  _parse: function(gauge, data) {

    return JSON.parse(data).value.timeSeries.map(function(metric) {
      metric._parent = gauge;
      return metric;
    });
  },


  _request: function(gauge) {
    var _this = this;

    if(!gauge.usgsID) return;

    return request({
      url: 'http://waterservices.usgs.gov/nwis/iv/?format=json&sites='+gauge.usgsID,
      gzip: true
    })
    .then(function(data) {
      return _this._parse(gauge, data[0].body);
    });
  },


  _prune: function() {

    return Measurement.destroy({
      dateTime: {
        '=<' : moment().subtract(1, 'day').toDate()
      }
    });
  },


  run: function() {
    var self = this,
        cache;

    return this._prune()
    .then(function() {
      return self._fetchGauges();
    })
    .then(function(gauges) {
      cache = gauges;
      return Promise.map(gauges, self._request);
    })
    .map(function(data) {
      return Promise.map(data, self._saveMeasurement);
    })
    .catch(function(err) {
      console.log(err);
    });
  },


  update: function(gauge) {
    var self = this;

    if(!gauge.usgsID) return;

    return this._request(gauge)
    .then(function(data) {
      return Promise.map(data, self._saveMeasurement);
    });
  }

};
