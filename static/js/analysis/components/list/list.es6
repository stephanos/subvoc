import $ from 'jquery';
import preact from 'preact';

import { WordListItem } from './list-item.es6';


class WordList extends preact.Component {
    render({ data, onSelectWord }) {
        return <div class="word-list">
            { $.map(data.words, item =>
                <WordListItem word={item} onSelectWord={onSelectWord} /> )}
        </div>
    }
}


export { WordList }
