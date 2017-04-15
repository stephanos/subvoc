import find from 'array.prototype.find';
import React from 'react';

import { WordDefinitionList } from './definition.es6';
import { WordExcerptList } from './excerpt.es6';
import { getDefinitions, getExcerpts, PARTS_OF_SPEACH, PartOfSpeachSelector } from './selector.es6';


class WordDetailBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSelectPOS(POS) {
        this.setState((prevState) => {  
            prevState.POS = POS;
        });
    }

    getSelectedPOS(word) {
        return this.state.POS ||
            find(PARTS_OF_SPEACH, (pos) => getExcerpts(word, pos).length > 0);
    }


    render() { 
        const { word } = this.props;
        const selectedPOS = this.getSelectedPOS(word);

        return <div>
            <header className="tab-group">
                <PartOfSpeachSelector 
                    word={word} 
                    selected={selectedPOS} 
                    onSelect={(p) => this.handleSelectPOS(p)} />
            </header>

            <section>
                <WordExcerptList excerpts={getExcerpts(word, selectedPOS)} />
            </section>

            <section>
                <WordDefinitionList definitions={getDefinitions(word, selectedPOS)} />
            </section>
        </div>;
    }
}


export { WordDetailBody };
