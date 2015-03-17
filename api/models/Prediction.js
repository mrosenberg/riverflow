/**
* Prediction.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {

    dateTime: {
      type: 'datetime'
    },

    primaryValue: {
      type: 'string'
    },

    primaryUnit: {
      type: 'string',
    },

    secondaryValue: {
      type: 'string'
    },

    secondaryUnit: {
      type: 'string'
    },

    gauge: {
      model: 'gauge'
    }

  }
};

