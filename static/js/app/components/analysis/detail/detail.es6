import $ from 'jquery';
import React from 'react';

import { WordDetailBody } from './body.es6';

import { Spinner } from '../../util/spinner.es6';


class WordDetail extends React.Component {

    render() {
        const { selection, onSelectPOS } = this.props;
        if (selection.word) {
            return <div className="word-detail">
                <h2 className="head">
                    <span className="label">{selection.word.token}</span>
                </h2>

                <section className="body">
                    { !selection.word.lookup
                        ? <Spinner />
                        : <WordDetailBody
                            selection={selection}
                            onSelectPOS={onSelectPOS} />
                    }
                </section>

                { selection.word.lookup
                    ? <div className="attribution">
                        <div className="attribution_dictionary">
                            <a href={selection.word.lookup.attribution.url}>{
                                selection.word.lookup.attribution.text
                            }</a>
                        </div>
                        <div className="attribution_api">
                            <img src="/static/img/wordnik_badge.png"/>
                        </div>
                    </div>
                    : <div/>
                }
            </div>;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        $(window).scrollTop(0);
    }
}


export { WordDetail };
