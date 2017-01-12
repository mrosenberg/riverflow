import DS     from 'ember-data';
import config from 'riverflow/config/environment';
const { JSONAPIAdapter } = DS;


export default JSONAPIAdapter.extend({


  'host': config.apiLocation,

});
