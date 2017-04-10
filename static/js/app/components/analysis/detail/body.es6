import find from 'array.prototype.find';
import React from 'react';

import { WordDefinitionList } from './definition.es6';
import { WordExcerptList } from './excerpt.es6';
import { getDefinitions, getExcerpts, PARTS_OF_SPEACH, WordPartOfSpeachSelector } from './selector.es6';


function getSelectedPOS(selection) {
    return selection.POS ||
        find(PARTS_OF_SPEACH, (pos) => getExcerpts(selection.word, pos).length > 0)[0];
}


const WordDetailBody = ({ selection, onSelectPOS }) => {
    const selectedPOS = getSelectedPOS(selection);
    const selectedWord = selection.word;

    return <div>
        <header className="tab-group">
            <WordPartOfSpeachSelector selected={selectedPOS} word={selectedWord} onSelect={onSelectPOS} />
        </header>

        <section>
            <WordExcerptList excerpts={getExcerpts(selectedWord, selectedPOS)} />
        </section>

        <section>
            <WordDefinitionList definitions={getDefinitions(selectedWord, selectedPOS)} />
        </section>
    </div>;
};


export { WordDetailBody };
