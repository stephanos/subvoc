import $ from 'jquery';
import preact from 'preact';

import { Analysis } from './analysis.es6';
import { Error } from './error.es6';


class Root extends preact.Component {
    render({ analysis }) {
        return analysis
            ? <Analysis analysis={analysis} />
            : <Error />;
    }
}


function loadAnalysis() {
    const imdbId = window.location.pathname.split('/').slice(-1)[0];
    return $.getJSON({
        url: `/api/analysis/${imdbId}`,
    });
}

function renderApp(analysis) {
    const container = document.getElementById('app');
    preact.render(
        <Root analysis={ analysis }/>,
        container,
        container.firstElementChild
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
