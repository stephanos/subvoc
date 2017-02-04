import $ from 'jquery';
import preact from 'preact';

import { WordDetail } from './detail/detail.es6';
import { WordList } from './list/list.es6';


class Analysis extends preact.Component {
    constructor() {
        super();
        this.state.selection = {};
        this.state.wordLookupByToken = {};
    }

    handleSelectWord(word) {
        const token = word.token;
        window.history.pushState(null, `${token}`, window.location.pathname + '#' + token);

        this.setState({ selection: { word }, originScrollPos: $(window).scrollTop() });

        $.getJSON({url: `/api/words/${token}`})
            .then((res) => {
                this.setState((prevState) => {
                    prevState.wordLookupByToken[token] = res;
                });
            })
            .catch((err) => {
                console.error(err); // eslint-disable-line
            });
    }

    handleSelectPOS(POS) {
        this.setState((prevState) => {
            prevState.selection.POS = POS;
        });
    }

    handleUnselectWord() {
        this.setState({ selection: { POS: undefined, word: undefined } });
    }

    onBackButtonEvent(evt) {
        this.handleUnselectWord();
    }

    componentDidMount() {
        window.onpopstate = this.onBackButtonEvent.bind(this);
    }

    render({ analysis }) {
        const selectedWord = this.state.selection.word;
        return <div class={'analysis ' + (selectedWord ? 'detail' : 'list')}>
            <WordDetail
                selection={this.state.selection}
                lookup={selectedWord ? this.state.wordLookupByToken[selectedWord.token] : undefined}
                onSelectPOS={(p) => this.handleSelectPOS(p)} />
            <WordList
                analysis={analysis}
                onSelectWord={(w) => this.handleSelectWord(w)} />
        </div>;
    }

    componentDidUpdate(prevProps, prevState) {
        const selectedWord = this.state.selection.word;
        if (!selectedWord) {
            $(window).scrollTop(this.state.originScrollPos);
        }
    }
}


export { Analysis };
