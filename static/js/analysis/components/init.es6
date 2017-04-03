import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app.es6';


function loadAnalysis() {
    const imdbId = window.location.pathname.split('/').slice(-1)[0];
    return $.getJSON({
        url: `/api/analysis/${imdbId}`,
    });
}

function renderApp(analysis) {
    const container = document.getElementById('main');
    ReactDOM.render(
        <App analysis={ analysis }/>, container
    );
}


window.onload = function() {
    loadAnalysis()
        .then(analysis => renderApp(analysis))
        .catch(err => {
            console.error(err); // eslint-disable-line
            renderApp(null);
        });
};
