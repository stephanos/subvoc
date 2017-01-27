import $ from 'jquery';
import preact from 'preact';


class WordListItem extends preact.Component {
    render({ word, onSelectWord }) {
        return <div class="card word-item" onClick={() => onSelectWord(word)}>
            <div class="label">{ word.word.token }</div>
            <div class="arrow">&gt;</div>
        </div>
    }
}


export { WordListItem }
