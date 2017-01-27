import $ from 'jquery';
import preact from 'preact';

import { WordDefinitionList } from './definition.es6';
import { WordDetailSelector } from './selector.es6';
import { WordExcerptList } from './excerpt.es6';


class WordDetailBody extends preact.Component {
    render({ lookup, selection, onSelectPOS }) {
        const headers = [['noun', 'noun'],
                         ['verb', 'verb'],
                         ['adjective', 'adj'],
                         ['adverb', 'adv']];

        const selectedPOS = selection.POS ||
            $.grep(headers, (h) => lookup[h[0]])[0][0];

        return <div>
            <header class="tab-group">
                { $.map(headers, (header) =>
                    <WordDetailSelector
                        active={selectedPOS === header[0]}
                        enabled={lookup[header[0]]}
                        code={header[0]}
                        label={header[1]}
                        onSelectPOS={onSelectPOS} />
                )}
            </header>
            <section class="examples">
                <WordExcerptList examples={selection.word.sentences} />
            </section>
            <hr/>
            <section class="explanations">
                <WordDefinitionList definitions={lookup[selectedPOS]} />
            </section>
        </div>;
    }
}


export { WordDetailBody };
