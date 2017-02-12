import $ from 'jquery';
import preact from 'preact';

import { WordDefinitionList } from './definition.es6';
import { WordExcerptList } from './excerpt.es6';
import { WordPartOfSpeachHeader } from './selector.es6';


class WordDetailBody extends preact.Component {
    render({ lookup, selection, onSelectPOS }) {
        const headers = [['noun', 'noun'],
                         ['verb', 'verb'],
                         ['adjective', 'adj'],
                         ['adverb', 'adv']];

        const selectedPOS = selection.POS || $.grep(headers, (h) => lookup[h[0]])[0][0];
        const wordForPOS = selection.word.byPOS[selectedPOS];

        console.log(selection.word);

        return <div>
            <header class="tab-group">
                { $.map(headers, (header) =>
                    <WordPartOfSpeachHeader
                        active={selectedPOS === header[0]}
                        enabled={lookup[header[0]]}
                        code={header[0]}
                        label={header[1]}
                        freq={(selection.word.byPOS[header[0]] || {}).freq}
                        onSelectPOS={onSelectPOS} />
                ) }
            </header>

            <section>
                <WordExcerptList excerpts={(wordForPOS || {}).excerpts} />
            </section>

            <section class="explanations">
                <WordDefinitionList definitions={lookup[selectedPOS]} />
            </section>
        </div>;
    }
}


export { WordDetailBody };
