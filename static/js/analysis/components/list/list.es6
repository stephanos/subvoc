import $ from 'jquery';
import preact from 'preact';

import { WordListItem } from './list-item.es6';


class WordList extends preact.Component {
    render({ analysis, onSelectWord }) {
        return <div class="word-list">
            <div class="media">
                <span class="title">
                    { analysis.media.title }
                </span>
            </div>
            <div>
                { $.map(analysis.words, item =>
                    <WordListItem word={item} onSelectWord={onSelectWord} /> )}
            </div>
        </div>;
    }
}


export { WordList };
