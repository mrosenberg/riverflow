var Promise  = require("bluebird"),
    request  = Promise.promisify(require("request")),
    parseXML = Promise.promisify(require('xml2js').parseString),
    moment   = require('moment');


Promise.longStackTraces();

var Updater = function UpdatePredictions() {


  this.prune = function() {

    return Prediction.destroy({where: {gauge: this.gauge.id}});
  };


  this.parse = function(data) {
    var values = [];

    data.map(function(metric) {

      values.push({
        dateTime: metric.valid[0]._,
        variableName: metric.primary[0]['$'].name,
        unitAbbreviation: metric.primary[0]['$'].units,
        value: metric.primary[0]._,
        gauge: this.gauge.id
      });

      values.push({
        dateTime: metric.valid[0]._,
        variableName: metric.secondary[0]['$'].name,
        unitAbbreviation: metric.secondary[0]['$'].units,
        value: metric.secondary[0]._,
        gauge: this.gauge.id
      });

    }, this);

    return values;
  };


  this.savePrediction = function(metric) {
    return Prediction.create(metric);
  };


  this.request = function() {

    return request({
      url: 'http://water.weather.gov/ahps2/hydrograph_to_xml.php?output=xml&gage='+this.gauge.nwsID,
      gzip: true
    })
    .bind(this)
    .then(function(data) {
      return parseXML(data[0].body);
    })
    .then(function(data) {
      return this.parse(data.site.forecast[0].datum);
    });
  };

  this.run = function() {

    return this.request().bind(this)
    .then(function(data) {

      return this.prune()
      .then(function() {
        return data;
      });
    })
    .then(function(data) {
      return this.savePrediction(data);
    })
    .done();
  };


};


function PredictionsUpdater(gauge) {

  this.gauge = gauge;
};


PredictionsUpdater.prototype = new Updater();

module.exports = PredictionsUpdater;

