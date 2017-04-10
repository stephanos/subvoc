import find from 'array.prototype.find';
import React from 'react';

import { WordDefinitionList } from './definition.es6';
import { WordExcerptList } from './excerpt.es6';
import { WordPartOfSpeachHeader } from './pos.es6';



const PARTS_OF_SPEACH = ['noun', 'verb', 'adj', 'adv'];


function getExcerpts(word, pos) {
    return (word.byPOS[pos] || {}).excerpts || [];
}

function getFreq(word, pos) {
    return (word.byPOS[pos] || {}).freq || 0;
}

function getDefinitions(word, pos) {
    return word.lookup[pos] || [];
}

function hasDetails(word, pos) {
    return getDefinitions(word, pos).length > 0 || getExcerpts(word, pos).length > 0;
}


const WordDetailBody = ({ selection, onSelectPOS }) => {
    const selectedPOS = selection.POS ||
        find(PARTS_OF_SPEACH, (pos) => getExcerpts(selection.word, pos).length > 0)[0];

    return <div>
        <header className="tab-group">
            { PARTS_OF_SPEACH.map((pos) => {
                return <WordPartOfSpeachHeader
                    key={pos}
                    active={selectedPOS === pos}
                    enabled={hasDetails(selection.word, pos)}
                    label={pos}
                    freq={getFreq(selection.word, pos)}
                    onSelectPOS={onSelectPOS} />;
            } ) }
        </header>

        <section>
            <WordExcerptList excerpts={getExcerpts(selection.word, selectedPOS)} />
        </section>

        <section>
            <WordDefinitionList definitions={getDefinitions(selection.word, selectedPOS)} />
        </section>
    </div>;
};


export { WordDetailBody };
