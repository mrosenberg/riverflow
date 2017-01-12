import Ember from 'ember';
const { Route, get, inject } = Ember;

export default Route.extend({


  'store': inject.service(),


  model() {
    const store = get( this, 'store' );

    return store.find( 'state' );
  }

});
