import $ from 'jquery';
import preact from 'preact';

import { WordDetailBody } from './body.es6';

import { Spinner } from '../util/spinner.es6';


class WordDetail extends preact.Component {
    render({ lookup, selection, onSelectPOS }) {
        if (selection.word) {
            return <div class="word-detail">
                <h3 class="head">
                    <span class="label">{selection.word.token}</span>
                </h3>

                <section class="body">
                    { !lookup
                        ? <Spinner />
                        : <WordDetailBody
                            lookup={lookup}
                            selection={selection}
                            onSelectPOS={onSelectPOS} />
                    }
                </section>

                { lookup
                    ? <div class="attribution">
                        <div class="attribution_dictionary">
                            <a href={lookup.attribution.url}>{lookup.attribution.text}</a>
                        </div>
                        <div class="attribution_api">
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
