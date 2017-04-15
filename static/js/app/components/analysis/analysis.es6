import React from 'react';

import { Word } from './word/word.es6';
import { WordList } from './list.es6';

import { API } from '../api.es6';
import { Nav } from '../nav.es6';
import { Router } from '../router.es6';
import { Spinner } from '../util/spinner.es6';
import { scrollTo, scrollPos } from '../util/scroll.es6';


class Analysis extends React.Component {

    constructor({ movie }) {
        super();
        this.state = { 
            movie: movie,
            selection: { difficulty: 3, word: undefined }
        };
    }


    handleSelectWord(word) {
        this.setState((prevState) => {
            prevState.listScrollPos = scrollPos();
            prevState.selection.word = word;
        });
    }

    handleSelectDifficulty(difficulty) {
        this.setState((prevState) => {
            prevState.selection.difficulty = difficulty;
        });
    }

    handleUnselectWord() {
        this.setState((prevState) => {
            delete prevState.selection.word;
        });
    }


    componentWillMount() {
        this.setState({
            analysisXHR: this.loadAnalysis(this.state.movie.id)
        });
    }

    componentWillUnmount() {
        if (this.state.analysisXHR) {
            this.state.analysisXHR.abort();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.selection.word && this.state.listScrollPos) {
            scrollTo(this.state.listScrollPos);
            delete this.state.listScrollPos;
        }
    }

    render() {
        const { analysis, movie, selection } = this.state;
        
        return <div>
            <Nav analysis={analysis}
                 selection={selection}
                 onClick={() => this.handleUnselectWord()} />

            { this.state.analysisXHR 
                ? <div>
                    <Spinner big={true} centered={true} />
                  </div>
                : <section className='container'>
                    <div className='analysis'>
                        { selection.word
                            ? <Word
                                movie={movie}
                                word={selection.word} />
                            : <WordList
                                analysis={analysis}
                                movie={movie}
                                difficulty={selection.difficulty}
                                onSelectDifficulty={(d) => this.handleSelectDifficulty(d)}
                                onSelectWord={(w) => this.handleSelectWord(w)} />
                        }
                    </div>
                </section> }
        </div>;
    }

    loadAnalysis(movieId) {
        const xhr = API.loadAnalysis(movieId);
        xhr.then((res) => {
            this.setState({
                analysisXHR: undefined,
                analysis: res.data
            });
        }).catch((err) => {
            if (API.isCancel(err)) {
                return;
            }
            console.error(err); // eslint-disable-line
            document.location.href = "/error";
        });
        return xhr;
    }
}


export { Analysis };
