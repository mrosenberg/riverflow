/**
* River.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var Promise = require('bluebird'),
    uuid    = require('node-uuid');

module.exports = {

  schema: true,

	attributes: {
		id: {
      type: 'uuid',
      required: true,
      primaryKey: true,
      unique: true
		},

		name: {
			type: 'string',
			required: true
		},

    status: {
      type: 'string',
      defaultsTo: 'off'
    },

    gauges: {
      collection: 'gauge',
      via: 'river'
    }
	},

  beforeValidate: function(values, next) {
    values.id = values.id || uuid.v4();
    return next();
  },
};

