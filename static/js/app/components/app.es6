import React from 'react';
import find from 'array.prototype.find';

import { Analysis } from './analysis/analysis.es6';
import { API } from './api.es6';
import { Router } from './router.es6';
import { Search } from './search/search.es6';


class App extends React.Component {

    constructor() {
        super();
        
        const data = Router.getState();
        this.state = { movie: { id: data.movieId }, word: data.word };
    }

    handleSelection(movie) {
        this.setState({ movie });
        Router.onAnalysisPage(movie);
    }

    componentWillMount() {
        Router.onUrlChange(() => this.setState((prevState) => {
            const data = Router.getState();
            prevState.movie.id = data.movieId;
            prevState.word = data.word;
        }));
    }


    render() {
        const { movie, word } = this.state;

        return <div>
            { movie.id
                ? <Analysis movie={movie} word={word} />
                : <Search onSelect={(m) => this.handleSelection(m)} /> }
        </div>;
    }
}


export { App };
