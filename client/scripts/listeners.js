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

  $('.chat').on('click', '.username', function(e) {
    app.friends[$(this).text()] = true;
    boldFriends($(this));
  })



})

function boldFriends(that) {
  // take div, get its text
  var username = that.text();
  // grab all usernames that match
  // debugger;
  $('.username').forEach(function(index){
    debugger;
    if ($('.username')[index].text() === username){
        $('.username')[index].parent().style('background-color', '#fff');
    }
  });
    // select their parents
    // apply style changes
}