import React from 'react';


const WordExcerpt = ({ excerpt }) =>
    <div className="excerpt">
        { excerpt.sentences.map((sentence, s_idx) => {
            const words = sentence.text.split(/\b/);
            return <div key={s_idx} className="line">
                { words.map((word, w_idx) => {
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
            { excerpts.map((excerpt, idx) => 
                <WordExcerpt key={idx} excerpt={excerpt} />) }
        </div>
        : <div></div>
    } </div>;


export { WordExcerptList };
