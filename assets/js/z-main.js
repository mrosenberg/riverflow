(function() {
  var $searchBox = $( '#search' );

  if ( !$searchBox.length ) return;

  var $form = $( 'form' );
  $form.find('.no-js').hide();
  $form.on('submit', function(e) {
    e.preventDefault();
  });

  var gauges = new Bloodhound({
    datumTokenizer: function(d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: '/prefetch/gauges',
    remote: '/search/gauges/%QUERY'
  });

  var rivers = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: '/prefetch/rivers',
    remote: '/search/rivers/%QUERY'
  });

  gauges.initialize();
  rivers.initialize();

  $searchBox.typeahead({
    highlight: true
  },
  {
    name: 'gauges',
    displayKey: 'name',
    source: gauges.ttAdapter(),
    templates: {
      empty: '<p class="empty-message">No Gauges Found</p>',
      header: '<p>Gauges</p>',
      suggestion: function(d) {
        return '<p>'+d.name+'</p>';
      }
    }
  },
  {
    name: 'rivers',
    displayKey: 'name',
    source: rivers.ttAdapter(),
    templates: {
      empty: '<p class="empty-message">No Gauges Found</p>',
      header: '<p>Rivers</p>',
      suggestion: function(d) {
        return '<p>'+d.name+'</p>';
      }
    }
  });

  function redirect(e, obj, type) {
    window.location.href = '/'+type+'/view/'+obj.id;
  }

  $form.on('typeahead:autocompleted', redirect);
  $form.on('typeahead:selected', redirect);
})();

