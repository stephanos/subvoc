import $ from 'jquery';
import preact from 'preact';

import { WordListItem } from './list-item.es6';


class WordList extends preact.Component {
    render({ analysis, onSelectWord }) {
        const sortedWords = analysis.words.sort((a, b) => a.freq - b.freq);
        return <div class="word-list">
            <div class="media">
                <span class="title">
                    { analysis.media.title }
                </span>
            </div>
            <div>
                { $.map(sortedWords, item =>
                    <WordListItem word={item} onSelectWord={onSelectWord} /> )}
            </div>
        </div>;
    }
}


export { WordList };
