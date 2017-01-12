export default function( server ) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  server.createList( 'state', 10 )
  .forEach( state => {

    server.createList( 'river', 5, { state } )
    .forEach( river => {

      server.createList( 'gauge', 3, { river, state } );
    });
  });
}
