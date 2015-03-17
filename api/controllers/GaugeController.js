/**
 * GaugeController
 *
 * @description :: Server-side logic for managing gauges
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

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


  new: function(req, res, next) {
    River.find(function(err, rivers) {
      if (err) return next(err);
      if (!rivers) return next();

      res.view({
        rivers:rivers
      });
    });
  },


  create: function(req, res, next) {

    Gauge.create( req.params.all(), function(err, gauge) {

      if (err) {
        req.session.flash = {
          err:err
        }
        return res.redirect('gauges/new');
      }

      res.redirect('gauges/view/' + gauge.id);
    });
  },


  edit: function(req, res, next) {

    Gauge.findOne(req.param('id'))
    .then(function(gauge) {

      River.find()
      .then(function(rivers) {
        res.view({
          gauge:gauge,
          rivers: rivers
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
        return res.redirect('gauges/edit/' + req.param('id'));
      }

      res.redirect('gauges/view/' + gauge[0].id);
    });

  },


  view: function(req, res, next) {

    Gauge.findOne(req.param('id'))
    .populate('measurements', {sort: 'updatedAt DESC'})
    .exec(function(err, gauge) {
      if (err) return next(err);
      if (!gauge) return next();

      var flow = _.filter(gauge.measurements, {variableID: 45807197});
      var height = _.filter(gauge.measurements, {variableID: 45807202});

      res.view({
        gauge:gauge,
        flow: flow[0],
        height: height[0]
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

