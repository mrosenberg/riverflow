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

    variableName: {
      type: 'string'
    },

    unitAbbreviation: {
      type: 'string',
    },

    value: {
      type: 'string',
      required: true
    },

    gauge: {
      model: 'gauge'
    }

  }
};
