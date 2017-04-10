import React from 'react';
import classNames from 'classnames';


const PARTS_OF_SPEACH = ['noun', 'verb', 'adj', 'adv'];

function getFreq(word, pos) {
    return (word.byPOS[pos] || {}).freq || 0;
}

function getExcerpts(word, pos) {
    return (word.byPOS[pos] || {}).excerpts || [];
}

function getDefinitions(word, pos) {
    return word.lookup[pos] || [];
}


const WordPartOfSpeachItem = ({ active, enabled, label, freq, onSelect }) => {
    const classes = classNames(label, 'tab', 'card', {'empty': !enabled}, {active});
    return <div onClick={() => enabled ? onSelect(label) : null} className={classes} >
        <div className="label">
            { label }
        </div>
        { freq ? <div className="count badge">{ freq }</div> : <div className="count">&nbsp;</div> }
    </div>;
};


const WordPartOfSpeachSelector = ({selected, word, onSelect}) => {
    return <div>
        { PARTS_OF_SPEACH.map((pos) => 
            <WordPartOfSpeachItem
                key={pos}
                active={selected === pos}
                enabled={(getExcerpts(word, pos).length || getDefinitions(word, pos).lenght) > 0}
                label={pos}
                freq={getFreq(word, pos)}
                onSelect={onSelect} />
        ) }
    </div>;
};


export { 
    getDefinitions, 
    getExcerpts, 
    PARTS_OF_SPEACH, 
    WordPartOfSpeachItem,
    WordPartOfSpeachSelector
};
