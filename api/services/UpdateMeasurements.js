var Promise = require("bluebird"),
    request = Promise.promisify(require("request")),
    moment  = require('moment');

Promise.longStackTraces();

 var Updater = function UpdateMeasurements() {


  this.saveMeasurement = function(metric) {

    return Measurement.create({
      gauge: this.gauge.id,
      dateTime: metric.values[0].value[0].dateTime,
      variableID: metric.variable.variableCode[0].variableID,
      variableName: metric.variable.variableName,
      variableDescription: metric.variable.variableDescription,
      value: metric.values[0].value[0].value,
      unitAbbreviation: metric.variable.unit.unitAbbreviation
    });
  };


  this.parse = function(gauge, data) {

    return JSON.parse(data).value.timeSeries.map(function(metric) {
      return metric;
    });
  };


  this.request = function(gauge) {

    return request({
      url: 'http://waterservices.usgs.gov/nwis/iv/?format=json&sites='+this.gauge.usgsID,
      gzip: true
    })
    .bind(this)
    .then(function(data) {
      return this.parse(this.gauge, data[0].body);
    });
  };


  this.prune = function() {

    return Measurement.destroy({
      where: {
        gauge: this.gauge.id,
        dateTime: {
          '<=' : moment().subtract(1, 'day').toISOString()
        }
      }
    });
  };


  this.run = function() {

    return this.request().bind(this)
    .then(function(data) {

      return this.prune();

    })
    .then(function(data) {

      return data.map(this.saveMeasurement, this);
    })
    .done();

  };

};


function MeasurementsUpdater(gauge) {

  this.gauge = gauge;
};


MeasurementsUpdater.prototype = new Updater();

module.exports = MeasurementsUpdater;
