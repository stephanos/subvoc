import $ from 'jquery';
import preact from 'preact';

import { WordDetailBody } from './body.es6';

import { Spinner } from '../util/spinner.es6';


class WordDetail extends preact.Component {
    render({ selection, onSelectPOS }) {
        if (selection.word) {
            return <div class="word-detail">
                <h2 class="head">
                    <span class="label">{selection.word.token}</span>
                </h2>

                <section class="body">
                    { !selection.word.lookup
                        ? <Spinner />
                        : <WordDetailBody
                            selection={selection}
                            onSelectPOS={onSelectPOS} />
                    }
                </section>

                { selection.word.lookup
                    ? <div class="attribution">
                        <div class="attribution_dictionary">
                            <a href={selection.word.lookup.attribution.url}>{
                                selection.word.lookup.attribution.text
                            }</a>
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
