
var app = {
  username: '',
  server: 'https://api.parse.com/1/classes/chatterbox',
  data: null,
  rooms: {},
  friends: {},
  clearMessages: function() {
    $('.chat').children().remove();
  },
  addMessage: function(messageObj) {
    var username = xssFilters.inHTMLData(messageObj.username);
    var text = xssFilters.inHTMLData(messageObj.text);
    var room = xssFilters.inHTMLData(messageObj.roomname);
    // Use the escape function here on text and username
    //Convert to html element
    if (app.friends.hasOwnProperty(username)) {
      text = "<strong>" + text + "</strong>";
    }
    $('.chat').append("<div class='row message room-" + room + "'>" +
     "<div class='username col-sm-3 col-md-3 col-lg-3 " + username + "'>" + 
      username + "</div>" +
      "<div class='col-sm-9 col-md-9 col-lg-9 text'>" + 
      text + "</div>" + "</div>"
    );
  },
  addRoom: function(roomName) {
    var room = xssFilters.inHTMLData(roomName);

    if (!app.rooms[room]) {
      app.rooms[room] = 1;
      $('.sidebar').append("<div class='room-title " + room + "'>" + room + "</div>");
    } else {
      app.rooms[room]++;
    }
  },
  fetch: function() {
    // Get messages
    $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/jsonp',
      success: function (data) {
        app.data = Array.prototype.slice.call(data.results);
        app.data.forEach(function(el) {
          if (!!!el.roomname) {
            el.roomname = 'general';
            app.addRoom('general');
          } else {
            app.addRoom(el.roomname);
          }
          app.addMessage(el);
        });
        app.displayFriends();
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to fetch message');
      }
    });
  },
  send: function(message) {
    // Posting method
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {

        console.log('chatterbox: Message sent');
        console.dir(message);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  displayFriends: function() {
    for (var username in app.friends) {
      $('.' + username).addClass('friends');
    }
  },
  init: function() {
    app.fetch();
  },
};

app.init();







