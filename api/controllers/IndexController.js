/**
 * IndexController
 *
 * @description :: Server-side logic for managing indices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function(req, res, next) {
    res.view()
  },

  cron: function(req, res, next) {
    UpdateGauges.run();
  }

};

