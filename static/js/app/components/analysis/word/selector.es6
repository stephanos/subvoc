import React from 'react';
import classNames from 'classnames';


const PARTS_OF_SPEECH = {
    'noun': 'noun',
    'verb': 'verb',
    'adjective': 'adj',
    'adverb': 'adv'
}


function getFreq(word, pos) {
    return (word.byPOS[pos] || {}).freq || 0;
}

function getExcerpts(word, pos) {
    return (word.byPOS[pos] || {}).excerpts || [];
}

function getDefinitions(word, pos) {
    return word.lookup[pos] || [];
}


const PartOfSpeechItem = ({ type, enabled, active, label, freq, onSelect }) => {
    const classes = classNames(label, 'tab', 'card', {'empty': !enabled}, {active});
    return <div onClick={() => enabled ? onSelect(type) : null} className={classes} >
        <div className="label">
            { label }
        </div>
        { freq ? <div className="count badge">{ freq }</div> : <div className="count">&nbsp;</div> }
    </div>;
};


const PartOfSpeechSelector = ({selected, word, onSelect}) => 
    <div>
        { Object.keys(PARTS_OF_SPEECH).map(pos =>
            <PartOfSpeechItem
                key={pos}
                type={pos}
                enabled={(getExcerpts(word, pos).length || getDefinitions(word, pos).length) > 0}
                active={selected === pos}
                label={PARTS_OF_SPEECH[pos]}
                freq={getFreq(word, pos)}
                onSelect={onSelect} />
        ) }
    </div>;


export { 
    getDefinitions, 
    getExcerpts, 
    PARTS_OF_SPEECH, 
    PartOfSpeechItem,
    PartOfSpeechSelector
};
