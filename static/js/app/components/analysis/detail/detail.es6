import React from 'react';

import { WordDetailBody } from './body.es6';

import { scrollTo } from '../../util/scroll.es6';
import { Spinner } from '../../util/spinner.es6';


class WordDetail extends React.Component {

    render() {
        const { word } = this.props;
        
        return <div className="word-detail">
            <h2 className="head">
                <span className="label">{word.token}</span>
            </h2>

            <section className="body">
                { !word.lookup
                    ? <Spinner />
                    : <WordDetailBody word={word} />
                }
            </section>

            { word.lookup
                ? <div className="attribution">
                    <div className="attribution_dictionary">
                        <a href={word.lookup.attribution.url}>{
                            word.lookup.attribution.text
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

    componentDidUpdate(prevProps, prevState) {
        scrollTo(0);
    }
}


export { WordDetail };
