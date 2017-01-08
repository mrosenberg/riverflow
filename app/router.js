import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('admin', function() {
    this.route('gauge', function() {
      this.route('new');
      this.route('edit');
    });
  });
  this.route('state');
  this.route('river');
});

export default Router;
