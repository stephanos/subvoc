import $ from 'jquery';
import React from 'react';


const WordListItem = ({ word, onSelectWord }) =>
    <div className="card word-item" onClick={() => onSelectWord(word)}>
        <div className="label">
            { word.token }
            { word.freq > 1 ? <span className="count badge">{word.freq}</span> : <span></span> }
        </div>
        <div className="arrow right">&gt;</div>
    </div>;


export { WordListItem };
