/**
* Measurement.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {

    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },

    variableID: {
      type: 'integer'
    },

    variableName: {
      type: 'string'
    },

    variableDescription: {
      type: 'string'
    },

    value: {
      type: 'string',
      required: true
    },

    unitAbbreviation: {
      type: 'string'
    },

    gaugeID: {
      type: 'string',
      required: true
    },

    gauge: {
      model: 'gauge'
    }
  }
};

