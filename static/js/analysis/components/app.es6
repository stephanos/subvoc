import $ from 'jquery';
import preact from 'preact';

import { Analysis } from './analysis.es6';


class Root extends preact.Component {
    render(props) {
        if (props.data) {
            return <Analysis data={props.data} />
        } else {
            return <span> Unable to analyse movie :( <br/> Sorry! </span>;
        }
    }
}


function loadAnalysis() {
    const imdbId = window.location.pathname.split('/').slice(-1)[0];
    return $.getJSON({
        url: `/analysis/${imdbId}`,
    })
}

function renderApp(analysis) {
    const container = document.getElementById('app');
    preact.render(
        <Root data={ analysis }/>,
        container,
        container.firstElementChild
    );
}


window.onload = function() {
    loadAnalysis()
        .then(analysis => renderApp(analysis))
        .catch(err => {
            console.error(err); // eslint-disable-line
            renderApp(null)
        })
}
