"use strict";

// const e = require("express");
var handleDomo = function handleDomo(e) {
  e.preventDefault();
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#domoName").val() == '' || $("#domoAge").val() == '') {
    handleError("RAWR! Name and age fields are required");
    return false;
  }

  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
    loadDomosFromServer();
  });
  return false;
};

var handleDeleteDomo = function handleDeleteDomo(e) {
  e.preventDefault();
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);

  if (e.target.querySelector("#domoId").value == '') {
    handleError("RAWR! Domo ID not found.");
    return false;
  }

  sendAjax('POST', $(e.target).attr("action"), $(e.target).serialize(), function () {
    loadDomosFromServer();
  });
  return false;
};

var DomoForm = function DomoForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "domoForm",
      onSubmit: handleDomo,
      name: "domoForm",
      action: "/maker",
      method: "POST",
      className: "domoForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name: "), /*#__PURE__*/React.createElement("input", {
      id: "domoName",
      type: "text",
      name: "name",
      placeholder: "Domo Name"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "age"
    }, "Age: "), /*#__PURE__*/React.createElement("input", {
      id: "domoAge",
      type: "text",
      name: "age",
      placeholder: "Domo Age"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "item"
    }, "Item: "), /*#__PURE__*/React.createElement("input", {
      id: "domoItem",
      type: "text",
      name: "item",
      placeholder: "Domo Item"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "makeDomoSubmit",
      type: "submit",
      value: "Make Domo"
    }))
  );
};

var DomoList = function DomoList(props) {
  if (Object.keys(props.domos).length === 0) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "domoList"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "emptyDomo"
      }, "No Domos Yet"))
    );
  }

  var domoNodes = props.domos.map(function (domo) {
    var domoItem = /*#__PURE__*/React.createElement("div", null);

    if (domo.item) {
      domoItem = /*#__PURE__*/React.createElement("h3", {
        className: "domoItem"
      }, " Item: ", domo.item);
    }

    var csrfToken = $("#domoForm input[name='_csrf']")[0].value;
    return (/*#__PURE__*/React.createElement("div", {
        key: domo._id,
        className: "domo"
      }, /*#__PURE__*/React.createElement("img", {
        src: "/assets/img/domoface.jpeg",
        alt: "domo face",
        className: "domoFace"
      }), /*#__PURE__*/React.createElement("h3", {
        className: "domoName"
      }, " Name: ", domo.name, " "), /*#__PURE__*/React.createElement("form", {
        onSubmit: handleDeleteDomo,
        name: "deleteDomoForm",
        action: "/deleteDomo",
        method: "POST",
        className: "deleteDomoForm"
      }, /*#__PURE__*/React.createElement("input", {
        id: "domoId",
        name: "domoId",
        type: "hidden",
        value: domo._id
      }), /*#__PURE__*/React.createElement("input", {
        type: "hidden",
        name: "_csrf",
        value: csrfToken
      }), /*#__PURE__*/React.createElement("input", {
        className: "deleteDomoSubmit",
        type: "submit",
        value: "X"
      })), /*#__PURE__*/React.createElement("h3", {
        className: "domoAge"
      }, " Age: ", domo.age, " "), domoItem)
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "domoList"
    }, domoNodes)
  );
};

var loadDomosFromServer = function loadDomosFromServer() {
  sendAjax('GET', '/getDomos', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {
      domos: data.domos
    }), document.querySelector("#domos"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(DomoForm, {
    csrf: csrf
  }), document.querySelector("#makeDomo"));
  ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {
    domos: {}
  }), document.querySelector("#domos"));
  loadDomosFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);
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
