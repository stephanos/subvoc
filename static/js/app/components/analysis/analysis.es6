import React from 'react';

import { Word } from './word/word.es6';
import { WordList } from './list.es6';

import { Nav } from '../nav.es6';

import { API } from '../../api.es6';
import { Router } from '../../router.es6';
import { Spinner } from '../util/spinner.es6';
import { scrollTo, scrollPos } from '../../util/scroll.es6';


class Analysis extends React.Component {

    constructor({ movieId, word }) {
        super();
        this.state = {
            difficulty: 3,
            word: { token: word }
        };
    }
    
    handleSelectWord(word) {
        this.setState((prevState) => {
            prevState.listScrollPos = scrollPos();
            prevState.word = word;
        });
    }

    handleSelectDifficulty(difficulty) {
        this.setState((prevState) => {
            prevState.difficulty = difficulty;
        });
    }

    handleUnselectWord() {
        this.setState((prevState) => {
            delete prevState.word;
        });
    }


    componentWillMount() {
        this.setState({
            analysisXHR: this.loadAnalysis(this.props.movieId)
        });
    }

    componentWillUnmount() {
        if (this.state.analysisXHR) {
            this.state.analysisXHR.abort();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.word && this.state.listScrollPos) {
            scrollTo(this.state.listScrollPos);
            delete this.state.listScrollPos;
        }
    }

    render() {
        const { analysis, difficulty, word } = this.state;
        
        return <div>
            <Nav analysis={analysis}
                 word={word}
                 onClick={() => this.handleUnselectWord()} />

            { this.state.analysisXHR 
                ? <div>
                    <Spinner big={true} centered={true} />
                  </div>
                : <section className='container'>
                    <div className='analysis'>
                        { word && word.token
                            ? <Word
                                analysis={analysis}
                                word={word} 
                                onUnselect={() => this.handleUnselectWord()} />
                            : <WordList
                                analysis={analysis}
                                difficulty={difficulty}
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
            this.setState((prevState) => {
                prevState.analysisXHR = undefined;
                prevState.analysis = res.data;
                prevState.word = res.data.words.find((w) => w == prevState.word.token);
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
