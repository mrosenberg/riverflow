import DS from 'ember-data';
const { Model, attr } = DS;

export default Model.extend({


  'timeZone':      attr( 'string' ),


  'usgsId':        attr( 'string' ),


  'nwsId':         attr( 'string' ),


  'name':          attr( 'string' ),


  'status':        attr( 'string' ),


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


  'upstreamGauge':   belongsTo( 'gauge' ),


  'downstreamGauge': belongsTo( 'gauge' )




});
