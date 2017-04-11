import React from 'react';
import find from 'array.prototype.find';

import { API } from './api.es6';
import { Analysis } from './analysis/analysis.es6';
import { Nav } from './nav.es6';
import { Router } from './router.es6';
import { Search } from './search/search.es6';
import { Spinner } from './util/spinner.es6';



class App extends React.Component {

    constructor({ page }) {
        super();

        let xhr;
        if (page.movieId) {
            xhr = this.loadAnalysis(page.movieId);
        }
        this.state = { analysisXHR: xhr };
    }


    handleSelection(movie) {
        Router.onAnalysisPage(movie.title, movie.id);
        
        this.setState((prevState) => {
            if (prevState.analysisXHR) {
                prevState.analysisXHR.abort();
            }

            prevState.analysisXHR = this.loadAnalysis(movie.id);
        });
    }

    render() {
        return <div>
            { this.state.analysisXHR 
                ? <div>
                    <Nav />
                    <Spinner big={true} centered={true} />
                  </div>
                : this.state.analysis 
                    ? <Analysis analysis={this.state.analysis} />
                    : <Search onSelect={(m) => this.handleSelection(m)} /> }
        </div>;
    }

    loadAnalysis(movieId) {
        const xhr = API.loadAnalysis(movieId);
        xhr.then((res) => {
            this.setState((prevState) => {
                prevState.analysisXHR = undefined;
                prevState.analysis = res;
            });
        })
        .catch((err) => {
            if (err.statusText === 'abort') {
                return;
            }
            document.location.href = "/error";
        });
        return xhr;
    }
}


export { App };
