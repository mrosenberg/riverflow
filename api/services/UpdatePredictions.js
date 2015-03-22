var Promise  = require("bluebird"),
    request  = Promise.promisify(require("request")),
    parseXML = Promise.promisify(require('xml2js').parseString),
    moment   = require('moment');


module.exports = {


  _fetchGauges: function() {

    return Gauge.find({where: {status: 'on'}});
  },


  _savePrediction: function(metric) {

    return Prediction.create(metric);
  },


  _parse: function(gauge, data) {

    return data.map(function(metric) {
      var values = [];

      values.push({
        dateTime: metric.valid[0]._,
        variableName: metric.primary[0]['$'].name,
        unitAbbreviation: metric.primary[0]['$'].units,
        value: metric.primary[0]._,
        gauge: gauge.id
      });

      values.push({
        dateTime: metric.valid[0]._,
        variableName: metric.secondary[0]['$'].name,
        unitAbbreviation: metric.secondary[0]['$'].units,
        value: metric.secondary[0]._,
        gauge: gauge.id
      });

      return values;
    });
  },


  _request: function(gauge) {
    var _this = this;

    return request({
      url: 'http://water.weather.gov/ahps2/hydrograph_to_xml.php?output=xml&gage='+gauge.nwsID,
      gzip: true
    })
    .then(function(data) {
      return parseXML(data[0].body);
    })
    .then(function(data) {
      return _this._parse(gauge, data.site.forecast[0].datum);
    });
  },


  _prune: function() {
    return Prediction.destroy();
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
      return Promise.map(data, _this._savePrediction);
    })
    .catch(function(err) {
      console.log(err);
    });
  },


  update: function(gauge) {
    var _this = this;

    if(!gauge.usgsID) return;

    return this._request(gauge)
    .then(function(data) {
      return Promise.map(data, _this._savePrediction);
    });
  }

};
