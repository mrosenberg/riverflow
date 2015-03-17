/**
 * MeasurementController
 *
 * @description :: Server-side logic for managing measurements
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

list: function() {
  Measurement.find(function(metrics) {
    console.log(metrics);

  });
}


};

