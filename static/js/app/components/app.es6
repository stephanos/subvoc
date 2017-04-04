import $ from 'jquery';
import React from 'react';

import { Analysis } from './analysis/analysis.es6';
import { Nav } from './nav.es6';
import { Search } from './search/search.es6';
import { Spinner } from './util/spinner.es6';


class App extends React.Component {

    constructor() {
        super();
        this.state = {};
        // const imdbId = window.location.pathname.split('/').slice(-1)[0];
    }


    handleSelection(movieId) {
        this.setState((prevState) => {
            if (prevState.analysisXHR) {
                prevState.analysisXHR.abort();
            }

            prevState.analysisXHR = this.loadAnalysis(movieId);
        });
    }

    render() {
        return <div>
            { this.state.analysisXHR 
                ? <div>
                    <Nav />
                    <Spinner big={true} />
                  </div>
                : this.state.analysis 
                    ? <Analysis analysis={this.state.analysis} />
                    : <Search onSelect={(id) => this.handleSelection(id)} /> }
        </div>;
    }


    loadAnalysis(imdbId) {
        const xhr = $.getJSON({
            url: `/api/analysis/${imdbId}`,
        })

        xhr.then((res) => {
            this.setState((prevState) => {
                prevState.analysisXHR = undefined;
                prevState.analysis = res;
            });
        })
        .catch((err) => {
            this.setState((prevState) => {
                prevState.analysisXHR = undefined;
            });
        });
        
        return xhr;
    }
}


export { App };
