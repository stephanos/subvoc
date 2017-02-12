import $ from 'jquery';
import preact from 'preact';

import { WordDetail } from './detail/detail.es6';
import { WordList } from './list/list.es6';


class Analysis extends preact.Component {

    constructor() {
        super();
        this.state.selection = { difficulty: 3 };
    }


    handleSelectWord(word) {
        const token = word.token;
        window.history.pushState(null, `${token}`, window.location.pathname + '#' + token);

        this.setState((prevState) => {
            prevState.listScrollPos = $(window).scrollTop();
            prevState.selection.word = word;
        });

        $.getJSON({url: `/api/words/${token}`})
            .then((res) => {
                this.setState((prevState) => {
                    prevState.selection.word.lookup = res;
                });
            })
            .catch((err) => {
                console.error(err); // eslint-disable-line
            });
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

    onBackButtonEvent(evt) {
        this.handleUnselectWord();
    }


    componentDidMount() {
        window.onpopstate = this.onBackButtonEvent.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.selection.word && this.state.listScrollPos) {
            $(window).scrollTop(this.state.listScrollPos);
            delete this.state.listScrollPos;
        }
    }


    render({ analysis }) {
        const selectedWord = this.state.selection.word;
        return <div class={'analysis ' + (selectedWord ? 'detail' : 'list')}>
            <WordDetail
                selection={this.state.selection}
                onSelectPOS={(p) => this.handleSelectPOS(p)} />
            <WordList
                analysis={analysis}
                selection={this.state.selection}
                onSelectDifficulty={(d) => this.handleSelectDifficulty(d)}
                onSelectWord={(w) => this.handleSelectWord(w)} />
        </div>;
    }
}


export { Analysis };
