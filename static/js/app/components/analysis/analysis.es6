import React from 'react';

import { API } from '../api.es6';
import { Nav } from '../nav.es6';
import { WordDetail } from './detail/detail.es6';
import { WordList } from './list/list.es6';

import { scrollToPos } from '../../util/scroll,es6';


class Analysis extends React.Component {

    constructor({ analysis }) {
        super();
        this.state = { selection: { difficulty: 3, POS: undefined, word: undefined } };
    }


    handleSelectWord(word) {
        this.setState((prevState) => {
            prevState.listScrollPos = (window.pageYOffset || document.documentElement.scrollTop)
                 - (document.documentElement.clientTop || 0);
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
        this.setState((prevState) => {
            delete prevState.selection.POS;
            delete prevState.selection.word;
        });
    }


    componentDidUpdate(prevProps, prevState) {
        if (!this.state.selection.word && this.state.listScrollPos) {
            window.scrollTo(this.state.listScrollPos);
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
        const xhr = API.lookupWord(word);
        xhr.then((res) => {
            this.setState((prevState) => {
                if (prevState.selection.word) {
                    prevState.selection.word.lookup = res.data;
                }
            });
        })
        .catch((err) => {
            if (err.statusText === 'abort') {
                return;
            }
            console.error(err); // eslint-disable-line
            document.location.href = "/error";
        });
        return xhr;
    }
}


export { Analysis };
