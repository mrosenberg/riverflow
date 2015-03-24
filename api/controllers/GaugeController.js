/**
 * GaugeController
 *
 * @description :: Server-side logic for managing gauges
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Promise = require('bluebird'),
    moment  = require('moment-timezone');


function heightChart(gauge) {

  var observedHeightChartData = gauge.measurements.filter(function(datum) {
    return (45807202 === datum.variableID);
  })
  .map(function(datum) {
    return [moment(datum.dateTime).valueOf(), +datum.value];
  });


  var predictedHeightChartData = gauge.predictions.filter(function(datum) {
    return ('Stage' === datum.variableName);
  })
  .map(function(datum) {
    return [moment(datum.dateTime).valueOf(), +datum.value];
  });



  return {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Height'
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        hour: '%a <br/> %l:%M%P',
        day: '%a <br/> %l:%M%P',
        week: '%a <br/> %l:%M%P'
      }
    },
    yAxis: {
      title: {
        text: 'Height (ft)'
      },
      min: 0,
      minorGridLineWidth: 0,
      gridLineWidth: 0,
      alternateGridColor: null,
      plotBands: [{ // Light air
        from: 0,
        to: gauge.actionStage,
        color: 'rgba(68, 170, 213, 0.1)',
        label: {
          //text: 'Light air',
          style: {
              color: '#606060'
          }
        }
      },
      {
        from: gauge.actionStage,
        to: gauge.minorStage,
        color: 'rgba(0, 0, 0, 0)',
        label: {
          text: 'Action',
          style: {
              color: '#606060'
          }
        }
      },
      {
        from: gauge.minorStage,
        to: gauge.moderateStage,
        color: 'rgba(68, 170, 213, 0.1)',
        label: {
          text: 'Minor',
          style: {
              color: '#606060'
          }
        }
      },
      { // Moderate breeze
        from: gauge.moderateStage,
        to: gauge.majorStage,
        color: 'rgba(0, 0, 0, 0)',
        label: {
          text: 'Moderate',
          style: {
              color: '#606060'
          }
        }
      },
      { // Fresh breeze
        from: gauge.majorStage,
        to: 100,
        color: 'rgba(68, 170, 213, 0.1)',
        label: {
          text: 'Major',
          style: {
              color: '#606060'
          }
        }
      }]
    },
    tooltip: {
      valueSuffix: ' ft',
      crosshairs: [true,true]
    },
    plotOptions: {
      spline: {
        lineWidth: 4,
        states: {
          hover: {
            lineWidth: 5
          }
        },
        marker: {
          enabled: false
        },
      }
    },
    series: [
      {
        name: 'Observed',
        data: observedHeightChartData,
      },
      {
        name: 'Predicted',
        data: predictedHeightChartData
      }
    ],
    navigation: {
      menuItemStyle: {
        fontSize: '10px'
      }
    }
  }
}

function flowChart(gauge) {

  var observedHeightChartData = gauge.measurements.filter(function(datum) {
    return (45807197 === datum.variableID);
  })
  .map(function(datum) {
    return [moment(datum.dateTime).valueOf(), +datum.value];
  });


  var predictedHeightChartData = gauge.predictions.filter(function(datum) {
    return ('Flow' === datum.variableName);
  })
  .map(function(datum) {
    return [moment(datum.dateTime).valueOf(), +datum.value * 1000];
  });

  return {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Flow'
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        hour: '%a <br/> %l:%M%P',
        day: '%a <br/> %l:%M%P',
        week: '%a <br/> %l:%M%P'
      }
    },
    yAxis: {
      title: {
        text: 'Flow ft&#179;/s'
      },
      min: 0,
      minorGridLineWidth: 0,
      gridLineWidth: 0,
      alternateGridColor: null
    },
    tooltip: {
      valueSuffix: ' ft&#179;/s',
      crosshairs: [true,true]
    },
    plotOptions: {
      spline: {
        lineWidth: 4,
        states: {
          hover: {
            lineWidth: 5
          }
        },
        marker: {
          enabled: false
        },
      }
    },
    series: [
      {
        name: 'Observed',
        data: observedHeightChartData,
      },
      {
        name: 'Predicted',
        data: predictedHeightChartData
      }
    ],
    navigation: {
      menuItemStyle: {
        fontSize: '10px'
      }
    }
  }
}


module.exports = {

  index: function(req, res) {
    Gauge.find(function(err, gauges) {
      if (err) return next(err);
      if (!gauges) return next();

      res.view({
        gauges:gauges
      });
    });
  },


  reset: function(req, res, next) {

    Measurement.destroy({
      where: {
        gauge: req.param('id')
      }
    })
    .exec(function(err, results) {
      if (err) console.log(err);
      res.send(results);
    });

    Prediction.destroy({
      where: {
        gauge: req.param('id')
      }
    })
    .exec(function(err, results) {
      if (err) console.log(err);
      res.send(results);
    });

  },


  new: function(req, res, next) {
    River.find(function(err, rivers) {
      if (err) return next(err);
      if (!rivers) return next();

      res.view({
        rivers:rivers,
        timeZones: moment.tz.names()
      });
    });
  },


  create: function(req, res, next) {

    Gauge.create( req.params.all(), function(err, gauge) {

      if (err) {
        req.session.flash = {
          err:err
        }
        console.log(err);
        return res.redirect('gauges/new');
      }

      Promise.all([
        UpdateMeasurements.update(gauge),
        UpdatePredictions.update(gauge)
      ])
      .then(function() {
        res.redirect('gauges/view/' + gauge.id);
      });

    });
  },


  edit: function(req, res, next) {

    Gauge.findOne(req.param('id'))
    .then(function(gauge) {

      River.find()
      .then(function(rivers) {
        res.view({
          gauge:gauge,
          rivers: rivers,
          timeZones: moment.tz.names()
        });
      });
    });
  },


  update: function(req, res, next) {

    Gauge.update( req.param('id'), req.params.all(), function(err, gauge) {

      if (err) {
        req.session.flash = {
          err:err
        }
        console.log(err);
        return res.redirect('gauges/edit/' + req.param('id'));
      }

      res.redirect('gauges/view/' + gauge[0].id);
    });

  },


  view: function(req, res, next) {

    Gauge.findOne(req.param('id'))
    .populate('measurements', {sort: 'dateTime ASC'})
    .populate('predictions')
    .populate('weather', {sort: 'updatedAt DESC'})
    .exec(function(err, gauge) {
      if (err) return next(err);
      if (!gauge) return next();

      var flow = _.filter(gauge.measurements, {variableID: 45807197});
      var height = _.filter(gauge.measurements, {variableID: 45807202});

      res.view({
        title: gauge.name,
        bodyClasses: 'view gauge',
        gauge: gauge,
        skycon: gauge.weather[0].currently.icon,
        updatedAgo: moment(gauge.updatedAt).from(),
        weather: gauge.weather[0],
        measurements: gauge.measurements,
        prediction: gauge.predictions,
        flow: flow[0],
        height: height[0],
        timeZone: gauge.timeZone,
        heightChart: JSON.stringify(heightChart(gauge)),
        flowChart: JSON.stringify(flowChart(gauge))
      });
    });
  },


  remove: function(req, res, next) {

    Gauge.destroy({id:req.param('id')})
    .exec(function(err){
      if (err) return next(err);

      res.redirect('gauges/');
    });
  }
};

