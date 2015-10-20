// YOUR CODE HERE:


var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  data: null,
  rooms: {
  },
  clearMessages: function() {
    $('.chat').children().remove();
  },
  addMessage: function(messageObj) {
    var username = xssFilters.inHTMLData(messageObj.username);
    var text = xssFilters.inHTMLData(messageObj.text);
    // Use the escape function here on text and username
    //Convert to html element
    $('.chat').append("<div class='row message'>" +
     "<div class='username col-sm-3 col-md-3 col-lg-3'>" +
      username + "</div>" +
      "<div class='col-sm-9 col-md-9 col-lg-9 text'>" + 
      text + "</div>" + "</div>"
    );
  },
  addRoom: function(roomName) {
    var room = xssFilters.inHTMLData(roomName);
    if (!!!roomName === false) {
      app.rooms.misc = true;
      $('#roomSelect').append("<option value='misc'></option>");
    } else if (!_.contains(app.rooms, room)) {
      app.rooms[room] = true;
      $('#roomSelect').append("<option value=" + room + "></option>");
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
        // toHtml(app.data[0]);
        app.data.forEach(function(el) {
          app.addMessage(el);
          app.addRoom(el.roomname);
        });
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
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  init: function() {
    app.fetch();
  },
};

app.init();


