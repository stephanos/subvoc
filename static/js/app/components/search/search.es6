import $ from 'jquery';
import React from 'react';

import { Intro } from './intro.es6';
import { Nav } from '../nav.es6';
import { SearchBar } from './bar.es6';
import { SearchResults } from './results.es6';

import { Spinner } from '../util/spinner.es6';


class Search extends React.Component {

    constructor() {
        super();
        this.state = { items: undefined };
    }

    handleSearch(query) {
        this.setState((prevState) => {
            if (prevState.searchXHR) {
                prevState.searchXHR.abort();
            }

            prevState.searchXHR = this.searchMovie(query);
        });
    }

    render() {
        const { onSelect } = this.props;
        return <div>
            <Nav />
            <section className='container'>
                <h1 className="heading">
                    Use movies to discover new vocabulary.
                </h1>
                <SearchBar onSearch={(q) => this.handleSearch(q)} />
                { this.state.searchXHR 
                    ? <Spinner big={true} />
                    : this.state.items === undefined 
                        ? <Intro />
                        : <SearchResults items={this.state.items} 
                                         onSelect={onSelect} /> 
                }                
            </section>
        </div>;
    }

    searchMovie(query) {
        if ($.trim(query) === '') {
            return;
        }

        const xhr = $.getJSON({
            url: `/api/search/${query}`,
        });

        xhr.then((res) => {
            this.setState((prevState) => {
                prevState.searchXHR = undefined;
                prevState.items = res.hits;
            });
        })
        .catch((err) => {
            if (err.statusText == 'abort') {
                return;
            }
            document.location.href = "/error";
        });

        return xhr;
    }     
}


export { Search }