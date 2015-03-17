var request     = require('request'),
    parseString = require('xml2js').parseString;

module.exports = {

  _fetchGauges: function() {
      return Gauge.find({where: {status: 'on'}});
  },


  _savePrediction: function(id, metric) {
    Prediction.create({
      gauge: id,
      dateTime: metric.values[0].value[0].dateTime,
      variableID: metric.variable.variableCode[0].variableID,
      variableName: metric.variable.variableName,
      variableDescription: metric.variable.variableDescription,
      value: metric.values[0].value[0].value,
      unitAbbreviation: metric.variable.unit.unitAbbreviation
    })
    .exec(function(err) {
      if (err) console.log(err);
    })
  },


  _request: function(gauge) {
    var self, url;

    url  = 'http://water.weather.gov/ahps2/hydrograph_to_xml.php?output=xml&gage='+gauge.nwsID;
    self = this;

    request({url: url, gzip: true}, function (error, response, body) {
      if (error || response.statusCode != 200) return;

      parseString(body, function (err, result) {
        result.site.forecast[0].datum.map(function(metric) {
console.log(metric);
        });
      });

     // data.value.timeSeries.map(function(metric) {
     //   self._savePrediction(gauge.id, metric);
     // });

    });
  },


  run: function() {
    var self   = this,
        gauges = this._fetchGauges();

    gauges.then(function(array) {
      _.each(array, function(gauge) {
        self._request(gauge);
      });
    });
  }

}
