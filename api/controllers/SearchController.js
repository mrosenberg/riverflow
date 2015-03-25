var Q = require('q');

/**
 * SearchController
 *
 * @description :: Server-side logic for managing searches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


  _searchRivers: function(term) {
    return River.find({
      where: {
        name: {
          'contains': term
        }
      },
      limit: 10,
      sort: 'name DESC'
    });
  },


  _searchGauges: function(term) {
    return Gauge.find({
      where: {
        name: {
          'contains': term
        }
      },
      limit: 10,
      sort: 'name DESC'
    });
  },


  _searchCombined: function(term) {
    return Q.all([
      this._searchRivers(term),
      this._searchGauges(term)
    ]);
  },


  preRivers: function(req, res, next) {
    River.find({
      limit: 50,
      sort: 'name DESC'
    })
    .then(function(results) {
      res.json(results);
    });
  },


  preGauges: function(req, res, next) {
    return Gauge.find({
      limit: 50,
      sort: 'name DESC'
    })
    .then(function(results) {
      res.json(results);
    });
  },


  searchRivers: function(req, res, next) {
    var term = req.param('term');

    this._searchRivers(term).then(function(results) {
      res.json(results);
    });
  },


  searchGauges: function(req, res, next) {
    var term = req.param('term');

    this._searchGauges(term).then(function(results) {
      res.json(results);
    });
  },

  index: function(req, res,next) {
    this._searchCombined(req.param('term')).spread(function(rivers, gauges) {
      res.view({
        title: '',
        bodyClasses: '',
        rivers: rivers,
        gauges: gauges
      });
    });
  }

};

