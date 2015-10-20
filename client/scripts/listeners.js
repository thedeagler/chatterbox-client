$(document).ready(function() {
  app.username = xssFilters.inHTMLData(window.location.search.split('=')[1]);

  $('.sidebar').on('click', '.room-title', function(e) {
    var room = '.room-' + $(this).attr('class').split(' ')[1];
    console.log(room);
    $('.message').show();
    $('.message').not(room).hide();
  })

  $('.show-all').on('click', function() {
    $('.message').show();
  })

  $('.send-message').on('click', function() {
    var message = {
      text: $('.message-entry').val(),
      username: app.username,
      roomname: $('.roomname-entry').val(),
    };
    app.send(message);
  })

  $('.chat').on('click', '.username', function() {
    var username = xssFilters.inHTMLData($(this).text());
    var rest = $('.' + username);
    rest.addClass('friends');
  })

  $('.sidebar').children().mouseover(function(el) {
    el.addClass('.sidebar-hidden');
  });

})
