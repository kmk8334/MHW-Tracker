// const e = require("express");

const handleDomo = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

    if($("#domoName").val() == '' || $("#domoAge").val() == '') {
        handleError("RAWR! Name and age fields are required");
        return false;
    }

    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function() {
        loadDomosFromServer();
    });

    return false;
};

const handleDeleteDomo = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

    if(e.target.querySelector("#domoId").value == '') {
        handleError("RAWR! Domo ID not found.");
        return false;
    }

    sendAjax('POST', $(e.target).attr("action"), $(e.target).serialize(), function() {
        loadDomosFromServer();
    });

    return false;
}

const DomoForm = (props) => {
    return (
    <form id="domoForm"
        onSubmit={handleDomo}
        name="domoForm"
        action="/maker"
        method="POST"
        className="domoForm"
        >
        <label htmlFor="name">Name: </label>
        <input id="domoName" type="text" name="name" placeholder="Domo Name"/>
        <label htmlFor="age">Age: </label>
        <input id="domoAge" type="text" name="age" placeholder="Domo Age"/>
        <label htmlFor="item">Item: </label>
        <input id="domoItem" type="text" name="item" placeholder="Domo Item"/>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="makeDomoSubmit" type="submit" value="Make Domo" />
    </form>
    );
};

const DomoList = function(props) {
    if(Object.keys(props.domos).length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos Yet</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(function(domo) {
        let domoItem = <div />;
        if(domo.item) {
            domoItem = <h3 className="domoItem"> Item: {domo.item}</h3>;
        }
        let csrfToken = $("#domoForm input[name='_csrf']")[0].value;
        return (
            <div key={domo._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="domoName"> Name: {domo.name} </h3>
                <form onSubmit={handleDeleteDomo}
                    name="deleteDomoForm"
                    action="/deleteDomo"
                    method="POST"
                    className="deleteDomoForm"
                    >
                    <input id="domoId" name="domoId" type="hidden" value={domo._id} />
                    <input type="hidden" name="_csrf" value={csrfToken} />
                    <input className="deleteDomoSubmit" type="submit" value="X" />
                </form>
                <h3 className="domoAge"> Age: {domo.age} </h3>
                {domoItem}
            </div>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
};

const loadDomosFromServer = () => {
    sendAjax('GET', '/getDomos', null, (data) => {
        ReactDOM.render(
            <DomoList domos={data.domos} />, document.querySelector("#domos")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <DomoForm csrf={csrf} />, document.querySelector("#makeDomo")
    );

    ReactDOM.render(
        <DomoList domos={{}} />, document.querySelector("#domos")
    );

    loadDomosFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});