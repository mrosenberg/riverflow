var request = require('request');

module.exports = {

    _fetchGauges: function() {
        return Gauge.find({where: {status: 'on'}});
    },


    _saveMeasurement: function(values) {
        Measurement.create(values);
    },


    _request: function(id) {
        var url = 'http://waterservices.usgs.gov/nwis/iv/?format=json&modifiedSince=PT1H&sites='+id;

        request(url, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);

            console.log(data.value.timeSeries);
          }
        });
    },


    run: function() {
        var self = this, gauges = this._fetchGauges();

        gauges.then(function(array) {
          _.each(array, function(gauge) {
            self._request(gauge.id);
          });
        });
    },




}
