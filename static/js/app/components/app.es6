import React from 'react';

import { Analysis } from './analysis/analysis.es6';
import { API } from './api.es6';
import { Router } from './router.es6';
import { Search } from './search/search.es6';


class App extends React.Component {

    constructor() {
        super();
        this.state = { selection: Router.getState() };
    }

    handleSelection(movie) {
        this.setState({ movie });
        Router.onAnalysisPage(movie);
    }

    componentWillMount() {
        Router.onUrlChange(() => this.setState(
            { selection: Router.getState() }
        ));
    }


    render() {
        const { movieId, word } = this.state;

        return <div>
            { movieId
                ? <Analysis movie={movieId} word={word} />
                : <Search onSelect={(m) => this.handleSelection(m)} /> }
        </div>;
    }
}


export { App };
