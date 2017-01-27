import $ from 'jquery';
import preact from 'preact';

import { WordDetailBody } from './body.es6'

import { Spinner } from '../util/spinner.es6'


class WordDetail extends preact.Component {
    render({ lookup, selection, onSelectPOS, onUnselectWord }) {
        if (selection.word) {
            return <div>
                <div class="card word-detail">
                    <header class="head">
                        <div class="arrow" onClick={() => onUnselectWord()}>&lt;</div>
                        <span class="label">{selection.word.word.token}</span>
                    </header>
                    <section class="body">
                        { !lookup
                            ? <Spinner />
                            : <WordDetailBody lookup={lookup}
                                            selection={selection}
                                            onSelectPOS={onSelectPOS} />
                        }
                    </section>
                </div>

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
            </div>
        }
    }
}


export { WordDetail }
