/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require('bcrypt');

module.exports = {

  register: function(req, res, next) {
    res.view();
  },


  signin: function(req, res, next) {
    res.view();
  },


  create: function(req, res, next) {

    User.create( req.params.all(), function(err, gauge) {

      if (err) {
        req.session.flash = {
          err:err
        }
        return res.redirect('/users/register');
      }

      return res.redirect('/');
    });
  },


  authenticate: function(req, res, next) {

    if( !req.param('email') || !req.param('password')) {
      return res.redirect('/users/signin');
    }

    User.findOneByEmail( req.param('email'), function(err, user) {
      if (err) return next(err);

      if (!user) {
        return res.redirect('/users/register');
      }

      bcrypt.compare( req.param('password'), user.encryptedPassword, function(err, valid) {
        if (err) return next(err);

        if (!valid) {
          req.session.flash = {
            err:err
          }
          return res.redirect('/users/signin');
        }

        req.session.authenticated = true;
        req.session.User = user;

        return res.redirect('/');

      });
    });
  }
};

