var request     = require('request'),
    parseString = require('xml2js').parseString;

module.exports = {


  _fetchGauges: function() {
    return Gauge.find({where: {status: 'on'}});
  },


  _savePrediction: function(metric) {
    Prediction.create(metric)
    .exec(function(err, results) {
      if (err) console.log(err);
    });''
  },


  _request: function(gauge) {
    var self, url;

    url  = 'http://water.weather.gov/ahps2/hydrograph_to_xml.php?output=xml&gage='+gauge.nwsID;
    self = this;

    request({url: url, gzip: true}, function (error, response, body) {
      if (error || response.statusCode != 200) return;

      parseString(body, function (err, result) {
        result.site.forecast[0].datum.map(function(metric) {
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

         values.map(function(metric) {
           self._savePrediction(metric);
         });

        });
      });
    });
  },


  _prune: function() {
    Prediction.destroy({
      dateTime: {
        '=<' : new Date()
      }
    }).exec(function(err, results) {
      if (err) console.log(err);
    })
  },


  run: function() {
    var self   = this,
        gauges = this._fetchGauges();

    this._prune();

    gauges.then(function(array) {
      _.each(array, function(gauge) {
        self._request(gauge);
      });
    });
  }

}
