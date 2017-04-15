import React from 'react';
import find from 'array.prototype.find';

import { API } from './api.es6';
import { Analysis } from './analysis/analysis.es6';
import { Search } from './search/search.es6';


class App extends React.Component {

    constructor({ page }) {
        super();
        this.state = { movie: { id: page.movieId }, word: page.word };
    }


    handleSelection(movie) {
        this.setState({ movie });
    }

    render() {
        return <div>
            { this.state.movie.id
                ? <Analysis movie={this.state.movie} />
                : <Search onSelect={(m) => this.handleSelection(m)} /> }
        </div>;
    }
}


export { App };
