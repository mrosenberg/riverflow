import Ember from 'ember';
const { Route, inject } = Ember;

export default Route.extend({


  'actions': {

    submit() {
      const model = this.controller.get( 'model' );

      return model.save();
    }
  },


  'store': inject.service(),


  model( { id } ) {
    const store = get( this, 'store' );

    return store.find( 'gauge', id );
  }
});
