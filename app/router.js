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
      this.route('edit', {'path': 'edit/:id'});
    });
    this.route('river', function() {
      this.route('edit', {'path': 'edit/:id'});
      this.route('new');
    });
    this.route('state', function() {
      this.route('edit', {'path': 'edit/:id'});
      this.route('new');
    });
  });
  this.route('gauge', function() {
    this.route('detail', {'path': 'detail/:id'});
  });
  this.route('river');
  this.route('state');
});

export default Router;
