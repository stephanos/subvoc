import React from 'react';

import { Intro } from './intro.es6';
import { Nav } from '../nav.es6';
import { SearchBar } from './bar.es6';
import { SearchResults } from './results.es6';

import { API } from '../api.es6';
import { Spinner } from '../util/spinner.es6';


class Search extends React.Component {

    constructor() {
        super();
        this.state = { items: undefined };
    }

    handleSearch(query) {
        this.setState((prevState) => {
            if (prevState.searchReq) {
                prevState.searchReq.cancel();
            }

            prevState.searchReq = this.searchMovie(query);
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
                { this.state.searchReq 
                    ? <Spinner big={true} />
                    : this.state.items === undefined 
                        ? <Intro />
                        : <SearchResults items={this.state.items} onSelect={onSelect} /> 
                }                
            </section>
        </div>;
    }

    searchMovie(query) {
        if (!query || !query.trim().length) {
            return;
        }

        const xhr = API.searchMovie(query);
        xhr.then((res) => {
            this.setState((prevState) => {
                prevState.searchReq = undefined;
                prevState.items = res.data.hits;
            });
        }).catch((err) => {
            if (API.isCancel(err)) {
                return;
            }
            console.error(err); // eslint-disable-line
            // document.location.href = "/error";
        });
        return xhr;
    }     
}


export { Search };