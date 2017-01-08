import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({


  'time-zone'() {
    return 'US/Eastern';
  },


  'usgs-id'() {
    return faker.random.uuid();
  },


  'nws-id'() {
    return faker.random.uuid();
  },


  'name'() {
    return faker.name.findName();
  },


  'status'() {
    return 'enabled';
  },


  'latitude'() {
    return faker.address.latitude();
  },


  'longitude'() {
    return faker.address.longitude();
  },


  'action-stage'() {

  },


  'minor-stage'() {

  },


  'moderate-stage'() {

  },


  'major-stage'() {

  },


  'measurements'() {

  },


  'predictions'() {

  },


  'weather'() {

  },




});
