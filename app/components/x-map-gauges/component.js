import Ember from 'ember';
const { Component, computed, get } = Ember;

export default Component.extend({


  'actions': {

    edit( marker ) {
      this.sendAction( 'transition', marker );
    }

  },


  'model': null,


  'markers': computed.map( 'model.[]', function( marker ) {
    const id    = get( marker, 'id'         );
    const lat   = get( marker, 'latitude'   );
    const long  = get( marker, 'longitude'  );
    const name  = get( marker, 'name'       );
    const river = get( marker, 'river.name' );

    return {
      'id': id,
      'location': [ lat, long ],
      'name': name,
      'river': river
    };
  }),


  'fitBounds': computed.map( 'model.[]', function( marker ) {
    const latitude  = get( marker, 'latitude'  );
    const longitude = get( marker, 'longitude' );

    return [ latitude, longitude ];
  })
});
