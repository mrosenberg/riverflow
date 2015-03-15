/**
* Measurement.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
  	values: {
  		type: 'json',
  		required: true
  	},
  	dateTime: {
  		type: 'dateTime',
  		required: true
  	},
    gaugeID: {
      type: 'integer',
      require: true
    }
  }
};

