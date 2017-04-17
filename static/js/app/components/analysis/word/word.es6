import React from 'react';

import { WordDetailBody } from './body.es6';

import { API } from '../../api.es6';
import { Router } from '../../router.es6';
import { scrollTo } from '../../util/scroll.es6';
import { Spinner } from '../../util/spinner.es6';


class Word extends React.Component {

    componentWillMount() {
        const { analysis, word } = this.props;

        Router.onWordPage(analysis.media, word.token);
        this.setState({
            word,
            wordXHR: this.lookupWord(word.token)
        });
    }

    componentDidMount() {
        window.onpopstate = (e) => {
            e.preventDefault();
            this.props.onUnselect();
        };
    }

    componentDidUpdate(prevProps, prevState) {
        scrollTo(0);
    }

    componentWillUnmount() {
        if (this.state.wordXHR) {
            this.state.wordXHR.cancel();
        }
        window.onpopstate = undefined;
    }


    render() {
        const { word } = this.state;
        
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

    lookupWord(word) {
        const req = API.lookupWord(word);
        req.then((res) => {
            this.setState((prevState) => {
                prevState.wordXHR = undefined;
                prevState.word.lookup = res.data;
            });
        }).catch((err) => {
            if (API.isCancel(err)) {
                return;
            }
            console.error(err); // eslint-disable-line
            document.location.href = "/error";
        });
        return req;
    }
}


export { Word };
