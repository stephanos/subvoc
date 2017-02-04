import $ from 'jquery';
import preact from 'preact';

import { Analysis } from './analysis.es6';


class Root extends preact.Component {
    render(props) {
        if (props.analysis) {
            return <Analysis analysis={props.analysis} />;
        } else {
            return <div class="error">
                <div>
                    Unable to analyse movie :(
                </div>
                <div>
                    Sorry!
                </div>
            </div>;
        }
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
