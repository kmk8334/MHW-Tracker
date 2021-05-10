"use strict";

$(document).ready(function () {
  $("#go-premium").on('click', function () {// TODO: Make post request to /goPremium
  });
});
"use strict";

var handleError = function handleError(message) {
  // TODO: Process error messages
  $("#errorMessage").text(message);
};

var redirect = function redirect(response) {
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
