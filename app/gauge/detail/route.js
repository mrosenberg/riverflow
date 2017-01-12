import Ember from 'ember';
const { Route, inject } = Ember;

export default Route.extend({


  'store': inject.service(),


  model( { id } ) {
    const store = get( this, 'store' );

    return store.find( 'gauge', id );
  }
});
