/**
* Gauge.js
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

    usgsID: {
      type: 'string',
      defaultsTo: null
    },

    nwsID: {
      type: 'string',
      defaultsTo: null
    },

    name: {
      type: 'string',
      required: true
    },

    status: {
      type: 'string',
      defaultsTo: 'off'
    },

    latitude: {
      type: 'string',
      required: true
    },

    longitude: {
      type: 'string',
      required: true
    },

    actionStage: {
      type: 'integer'
    },

    minorStage: {
      type: 'integer'
    },

    moderateStage: {
      type: 'integer'
    },

    majorStage: {
      type: 'integer'
    },

    river: {
      model: 'river'
    },

  	measurements: {
  		collection: 'measurement',
  		via: 'gauge'
  	},

    predictions: {
      collection: 'prediction',
      via: 'gauge'
    },

    weather: {
      collection: 'weather',
      via: 'gauge'
    }
  },


  beforeCreate: function(values, next) {
    values.id = uuid.v4();
    return next();
  },
};
