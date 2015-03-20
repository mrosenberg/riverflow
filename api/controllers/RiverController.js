/**
 * RiverController
 *
 * @description :: Server-side logic for managing rivers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function(req, res) {
    River.find(function(err, rivers) {
      if (err) return next(err);
      if (!rivers) return next();

      res.view({
        session: req.session,
        rivers:rivers
      });
    });
  },


  edit: function(req, res, next) {

    River.findOneById(req.param('id'), function(err, river) {

      if (err) {
        req.session.flash = {
          err:err
        }

        return res.redirect('rivers');
      }

      res.view({
        river: river
      });
    });
  },


  update: function(req, res, next) {

    River.update( {id: req.param('id') }, req.params.all(), function(err, river) {

      if (err) {
        req.session.flash = {
          err:err
        }
        return res.redirect('rivers/edit/' + req.param('id'));
      }

      res.redirect('rivers/view/' + river[0].id);
    });
  },


  new: function(req, res) {
    res.view();
  },


  create: function(req, res, next) {

    River.create( req.params.all(), function(err, river) {

      if (err) {
        req.session.flash = {
          err:err
        }
        return res.redirect('rivers/new');
      }

      res.redirect('rivers/view/' + river.id);
    });
  },


  view: function(req, res, next) {

    River.findOneById(req.param('id')).populate('gauges').exec(function(err, river) {
      console.log(river);
      if (err) return next(err);
      if (!river) return next();

      res.view({
        river: river
      });
    });
  }
};

