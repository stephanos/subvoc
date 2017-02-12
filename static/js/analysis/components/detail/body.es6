import $ from 'jquery';
import preact from 'preact';

import { WordDefinitionList } from './definition.es6';
import { WordExcerptList } from './excerpt.es6';
import { WordPartOfSpeachHeader } from './selector.es6';



const PARTS_OF_SPEACH = ['noun', 'verb', 'adj', 'adv'];


function getExcerpts(word, pos) {
    return (word.byPOS[pos] || {}).excerpts || [];
}

function getFreq(word, pos) {
    return (word.byPOS[pos] || {}).freq || 0;
}

function getDefinitions(lookup, pos) {
    return lookup[pos] || [];
}

function hasDetails(word, lookup, pos) {
    return getDefinitions(lookup, pos).length > 0 || getExcerpts(word, pos).length > 0;
}


class WordDetailBody extends preact.Component {

    constructor({ lookup, selection }) {
        super();
        this.state.selectedPOS = selection.POS ||
            $.grep(PARTS_OF_SPEACH, (pos) => hasDetails(selection.word, lookup, pos));
    }

    render({ lookup, selection, onSelectPOS }) {
        console.log(selection.word, this.state);

        return <div>
            <header class="tab-group">
                { $.map(PARTS_OF_SPEACH, (pos) => {
                    return <WordPartOfSpeachHeader
                        active={this.state.selectedPOS === pos}
                        enabled={hasDetails(selection.word, lookup, pos)}
                        label={pos}
                        freq={getFreq(selection.word, pos)}
                        onSelectPOS={onSelectPOS} />
                } ) }
            </header>

            <section>
                <WordExcerptList excerpts={getExcerpts(selection.word, this.state.selectedPOS)} />
            </section>

            <section>
                <WordDefinitionList definitions={getDefinitions(lookup, this.state.selectedPOS)} />
            </section>
        </div>;
    }
}


export { WordDetailBody };
