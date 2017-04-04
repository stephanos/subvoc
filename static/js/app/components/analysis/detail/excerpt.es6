import $ from 'jquery';
import React from 'react';


const WordExcerpt = ({ excerpt }) =>
    <div className="excerpt">
        { $.map(excerpt.sentences, (sentence, s_idx) => {
            const words = sentence.text.split(/\b/);
            return <div key={s_idx} className="line">
                { $.map(words, (word, w_idx) => {
                    const className = word === excerpt.token ? 'token' : '';
                    return <span key={w_idx} className={className}>{ word }</span>;
                })}
            </div>;
        })}
    </div>;


const WordExcerptList = ({ excerpts }) =>
    <div> { excerpts.length > 0
        ? <div className="excerpts">
            <h4>
                Excerpt
            </h4>
            { $.map(excerpts, (excerpt, idx) => 
                <WordExcerpt key={idx} excerpt={excerpt} />) }
        </div>
        : <div></div>
    } </div>;


export { WordExcerptList };
