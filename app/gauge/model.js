import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default Model.extend({



  'name':          attr( 'string' ),


  'status':        attr( 'string' ),


  'timeZone':      attr( 'string' ),


  'usgsId':        attr( 'string' ),


  'nwsId':         attr( 'string' ),


  'latitude':      attr( 'number' ),


  'longitude':     attr( 'number' ),


  'actionStage':   attr( 'number' ),


  'minorStage':    attr( 'number' ),


  'moderateStage': attr( 'number' ),


  'majorStage':    attr( 'number' ),


  'measurements':  attr(),


  'predictions':   attr(),


  'weather':       attr(),



  // Associations


  'river':           belongsTo( 'river' ),


  'state':           belongsTo( 'state' ),


  'upstreamGauge':   belongsTo( 'gauge', { inverse: null } ),


  'downstreamGauge': belongsTo( 'gauge', { inverse: null } )


});
