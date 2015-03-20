/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  schema: true,

  attributes: {

    firstName: {
      type: 'string',
      required: true
    },

    lastName: {
      type: 'string',
      required: true
    },

    email: {
      type: 'string',
      email: true,
      unique: true
    },


    encryptedPassword: {
      type: 'string'
    },


    toJSON: function() {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      delete obj.password;
    }


  },

  beforeCreate: function(values, next) {
    bcrypt.hash(values.password, 10, function(err, encryptedPassword) {
      if(err) return next(err);
      values.encryptedPassword = encryptedPassword;
      next();
    });
  }
};

