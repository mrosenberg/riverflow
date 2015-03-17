var request = require('request');

module.exports = {

  _fetchGauges: function() {
      return Gauge.find({where: {status: 'on'}});
  },


  _saveMeasurement: function(id, metric) {
    Measurement.create({
      gaugeID: id,
      variableId: metric.variable.variableCode[0].variableID,
      variableName: metric.variable.variableName,
      variableDescription: metric.variable.variableDescription,
      value: metric.values[0].value[0].value,
      unitAbbreviation: metric.variable.unit.unitAbbreviation
    })
    .exec(function(err) {
      if (err) console.log(err);
    })
  },


  _request: function(id) {
    var self, url;

    url  = 'http://waterservices.usgs.gov/nwis/iv/?format=json&sites='+id;
    self = this;

    request({url: url, gzip: true}, function (error, response, body) {
      if (error || response.statusCode != 200) return;

      var data = JSON.parse(body);

      data.value.timeSeries.map(function(metric) {
        self._saveMeasurement(id, metric);
      });

    });
  },


  run: function() {
      var self = this, gauges = this._fetchGauges();

      gauges.then(function(array) {
        _.each(array, function(gauge) {
          self._request(gauge.id);
        });
      });
  }

}
