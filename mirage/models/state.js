import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({


  'river': hasMany( 'river' ),


  'gauge': hasMany( 'gauge' ),


});
