import $ from 'jquery';
import React from 'react';

import { Error } from '../error.es6';
import { Nav } from '../nav.es6';
import { WordDetail } from './detail/detail.es6';
import { WordList } from './list/list.es6';


class Analysis extends React.Component {

    constructor({ analysis }) {
        super();
        this.state = { selection: { difficulty: 3, POS: undefined, word: undefined } };
    }


    handleSelectWord(word) {
        this.setState((prevState) => {
            prevState.listScrollPos = $(window).scrollTop();
            prevState.selection.word = word;
        });
        this.lookupWord(word);
    }

    handleSelectDifficulty(difficulty) {
        this.setState((prevState) => {
            prevState.selection.difficulty = difficulty;
        });
    }

    handleSelectPOS(POS) {
        this.setState((prevState) => {
            prevState.selection.POS = POS;
        });
    }

    handleUnselectWord() {
        window.location.hash = '';
        this.setState((prevState) => {
            delete prevState.selection.POS;
            delete prevState.selection.word;
        });
    }


    componentDidMount() {
        window.onpopstate = this.handleUnselectWord.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.selection.word && this.state.listScrollPos) {
            $(window).scrollTop(this.state.listScrollPos);
            delete this.state.listScrollPos;
        }
    }

    render() {
        const { analysis } = this.props;
        return <div>
            <Nav analysis={analysis}
                 selection={this.state.selection}
                 onClick={() => this.handleUnselectWord()} />
            
            <section className='container'>
                <div className='analysis'>
                    { this.state.selection.word
                        ? <WordDetail
                            selection={this.state.selection}
                            onSelectPOS={(p) => this.handleSelectPOS(p)} />
                        : <WordList
                            analysis={analysis}
                            selection={this.state.selection}
                            onSelectDifficulty={(d) => this.handleSelectDifficulty(d)}
                            onSelectWord={(w) => this.handleSelectWord(w)} />
                    }
                </div>
            </section>
        </div>;
    }


    lookupWord(word) {
        $.getJSON({url: `/api/words/${word.token}`})
            .then((res) => {
                this.setState((prevState) => {
                    prevState.selection.word.lookup = res;
                });
            })
            .catch((err) => {
                console.error(err); // eslint-disable-line
            });
    }
}


export { Analysis };
