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
        this.setState({ selection: { word } });

        $.getJSON({url: `/api/words/${word.word.token}`})
            .then((res) => {
                this.setState((prevState) => {
                    prevState.wordLookupByToken[word.word.token]  = res
                });
            })
            .catch((err) => {
                console.error(err); // eslint-disable-line
                // TODO
            });
    }

    handleSelectPOS(POS) {
        this.setState((prevState) => {
            prevState.selection.POS = POS
        })
    }

    handleUnselectWord() {
        this.setState({ selection: { POS: undefined, word: undefined } });
    }

    render({ data }) {
        const selectedWord = this.state.selection.word
        return <div class={'analysis ' + (selectedWord ? 'detail' : 'list')}>
            <WordDetail
                selection={this.state.selection}
                lookup={selectedWord ? this.state.wordLookupByToken[selectedWord.word.token] : undefined}
                onSelectPOS={(p) => this.handleSelectPOS(p)}
                onUnselectWord={() => this.handleUnselectWord()} />
            <WordList
                data={data}
                onSelectWord={(w) => this.handleSelectWord(w)} />
        </div>
    }
}


export { Analysis }
