import $ from 'jquery';
import preact from 'preact';


const WordListItem = ({ word, onSelectWord }) =>
    <div class="card word-item" onClick={() => onSelectWord(word)}>
        <div class="label">
            { word.token }
            { word.freq > 1 ? <span class="count badge">{word.freq}</span> : <span></span> }
        </div>
        <div class="arrow right">&gt;</div>
    </div>;


export { WordListItem };
