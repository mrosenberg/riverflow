import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({


  'river': belongsTo( 'river' ),


  'state': belongsTo( 'state' )


});
