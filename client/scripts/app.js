// YOUR CODE HERE:
var app = {
  data: null,
};

$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'GET',
  contentType: 'application/jsonp',
  success: function (data) {
    app.data = Array.prototype.slice.call(data.results);
    // toHtml(app.data[0]);
    loadAll(app.data)
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
});

// Take data and convert into an html element
function toHtml(messageObj) {
  var text = xssFilters.inHTMLData(messageObj.text);
  var username = xssFilters.inHTMLData(messageObj.username);
  // Use the escape function here on text and username
  //Convert to html element
  $('.chat').append("<div class='message'><span class='username'>" + username + "</span>: <span class='text'>" + text + "</span><div>");
}

function loadAll(array) {
  array.forEach(function(el) {
    toHtml(el);
  })
}

// Security escape function


// // Posting method
$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'POST',
  data: JSON.stringify({"username": "wordToYourMother", "text": "This is the time, son: ".concat(new Date())}),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
});