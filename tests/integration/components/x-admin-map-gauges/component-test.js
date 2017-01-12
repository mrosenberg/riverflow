import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('x-admin-map-gauges', 'Integration | Component | x admin map gauges', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{x-admin-map-gauges}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#x-admin-map-gauges}}
      template block text
    {{/x-admin-map-gauges}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
