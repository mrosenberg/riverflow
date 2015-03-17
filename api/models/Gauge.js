/**
* Gauge.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {
  	id: {
      type: 'string',
      primaryKey: true,
      unique: true
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

    river: {
      model: 'river'
    },

  	measurements: {
  		collection: 'measurement',
  		via: 'gauge'
  	},

    measurements: {
      collection: 'prediction',
      via: 'gauge'
    }
  }
};
