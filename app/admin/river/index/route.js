import Ember from 'ember';
const { Route, inject, get } = Ember;

export default Route.extend({


  'store': inject.service(),


  model() {
    const store = get( this, 'store' );

    return store.findAll( 'river' );
  }

});
