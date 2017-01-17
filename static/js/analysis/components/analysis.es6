import $ from 'jquery';
import preact from 'preact';


class WordDetail extends preact.Component {
    render({ word, onUnselect }) {
        if (word) {
            return <div class="card word-detail">
                <header>
                    <div class="arrow" onClick={() => onUnselect()}>&lt;</div>
                    {word.token}
                </header>
                <section>
                    ...
                </section>
            </div>
        }
    }
}


class WordListItem extends preact.Component {
    render({ word, onSelect }) {
        return <div class="card word-item" onClick={() => onSelect(word)}>
            <div class="label">{ word.token }</div>
            <div class="arrow">&gt;</div>
        </div>
    }
}


class WordList extends preact.Component {
    render({ data, onSelect }) {
        return <div class="word-list">
            { $.map(data.words, item =>
                <WordListItem word={item.word} onSelect={onSelect} /> )}
        </div>
    }
}


class Analysis extends preact.Component {
    handleSelect(word) {
        this.setState({ word: word });
    }

    handleUnselect() {
        this.setState({ word: undefined });
    }

    render({ data }) {
        return <div class={'analysis ' + (this.state.word ? 'detail' : 'list')}>
            <WordDetail word={this.state.word} onUnselect={() => this.handleUnselect()} />
            <WordList data={data} onSelect={(w) => this.handleSelect(w)} />
        </div>
    }
}


export { Analysis }
