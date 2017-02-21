import $ from 'jquery';
import preact from 'preact';

import { App } from './app.es6';


function loadAnalysis() {
    const imdbId = window.location.pathname.split('/').slice(-1)[0];
    return $.getJSON({
        url: `/api/analysis/${imdbId}`,
    });
}

function renderApp(analysis) {
    const container = document.getElementById('body');
    const parent = document.getElementById('main');
    preact.render(
        <App analysis={ analysis }/>, container, parent
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
