import $ from 'jquery';
import preact from 'preact';

import { Error } from './error.es6';
import { WordDetail } from './detail/detail.es6';
import { WordList } from './list/list.es6';


function lookupWord(word) {
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


const Nav = ({ analysis, selection, onClick }) =>
    <nav class='navigation'>
        <section class='container'>
            <span class='navigation-title'>
                <h1 class='title'>
                    { selection.word
                        ? <div class='media' onclick={onClick}>
                            <span class="arrow left">&gt;</span>
                            <span class="name">{ analysis.media.title }</span>
                        </div>
                        : <a class='generic' href="/">
                            subvoc
                        </a>
                    }
                </h1>
            </span>
        </section>
    </nav>


class App extends preact.Component {

    constructor({ analysis }) {
        super();

        let selectedWord = undefined;
        if (analysis) {
            const wordMatch = $.grep(analysis.words, (w) => w.token === window.location.hash.replace('#', ''));
            if (wordMatch.length > 0) {
                selectedWord = wordMatch[0];
                lookupWord.bind(this)(selectedWord);
            }
        }
        this.state.selection = { difficulty: 3, POS: undefined, word: selectedWord };
    }


    handleSelectWord(word) {
        window.history.pushState(null, `${word.token}`, window.location.pathname + '#' + word.token);
        this.setState((prevState) => {
            prevState.listScrollPos = $(window).scrollTop();
            prevState.selection.word = word;
        });
        lookupWord.bind(this)(word);
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


    componentDidMount() {
        window.onpopstate = this.handleUnselectWord.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.selection.word && this.state.listScrollPos) {
            $(window).scrollTop(this.state.listScrollPos);
            delete this.state.listScrollPos;
        }
    }

    render({ analysis }) {
        return <div class="wrapper">
            <Nav analysis={analysis}
                 selection={this.state.selection}
                 onClick={() => this.handleUnselectWord()} />

            <section class='container'>
                { analysis
                    ? <div class='analysis'>
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
                    : <Error />
                }
            </section>
        </div>;
    }
}


export { App };
