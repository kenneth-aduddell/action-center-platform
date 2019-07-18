(function() {
  var filterActionPages = function(e) {
    if (e.type == "submit")
      e.preventDefault();

    var form = $(e.target).closest("form")[0];

    // timeout required for this to behave correctly during a form reset
    setTimeout(function() {
      $.get(form.action + '?' + $(form).serialize(), function(resp) {
        $('#content .table').replaceWith(resp);
      });
    }, 1);
  };

  $('#filter_action_pages').on('submit', filterActionPages);
  $('#filter_action_pages').on('reset', filterActionPages);
  $('#filter_action_pages select').on('change', filterActionPages);
})();

$('.action_pages-edit, .action_pages-new').on('change', 'input[name=action_type]', function(e) {
  $('.action-fields').removeClass('active')
    .filter('[data-action_type=' + e.target.value +']')
    .addClass('active');

  $('[id^=action_page_enable_').attr('value', 'false');
  $('#action_page_enable_' + e.target.value).attr('value', 'true');

  reflowEpicEditor();
});

$(document).on('click', '#individual-targets #add', function(e) {
  e.preventDefault();

  var add = $(this).closest('li');
  var input = add.find('input');
  var handle = input.val().replace(/^@+/, '');

  var li = $('<li>');
  li.append($('<a>').attr({ href: 'https://twitter.com/'+handle, target: '_new' }).text('@'+handle));
  li.append(
    $('<input>').attr({
      name: 'action_page[tweet_attributes][tweet_targets_attributes]['+add.siblings('li').length+'][twitter_id]',
      value: handle,
      type: 'hidden'
    })
  );

  add.before(li);

  input.val('').focus();
});