export default function() {

  /*
   * Setup
   *
  */
  this.urlPrefix = 'http://localhost:3000';



  /*
   * Routes
   *
  */

  // States
  this.resource( '/states' );
  this.get( '/admin/states', 'state' );
  this.get( '/admin/states/:id', ( { states }, request ) => {
    return states.find( request.params.id );
  });


  // Rivers
  this.resource( '/rivers' );
  this.get( '/admin/rivers', 'river' );
  this.get( '/admin/rivers/:id', ( { rivers }, request ) => {
    return rivers.find( request.params.id );
  });


  // Gauges
  this.resource( '/gauges' );
  this.get( '/admin/gauges', 'gauge' );
  this.get( '/admin/gauges/:id', ( { gauges }, request ) => {
    return adminGauges.find( request.params.id );
  });

}
