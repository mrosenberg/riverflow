import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({


  'gauge': hasMany( 'gauge' ),


  'state': belongsTo( 'state' )


});
