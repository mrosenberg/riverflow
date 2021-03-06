import Ember from 'ember';
const { Route, inject, get } = Ember;

export default Route.extend({


  'actions': {

    transition( marker ) {
      this.transitionTo( 'admin.gauge.edit', marker.id )
    }

  },


  'store': inject.service(),


  model() {
    const store = get( this, 'store' );

    return store.findAll( 'gauge' );
  }

});
