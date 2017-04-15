import find from 'array.prototype.find';
import React from 'react';

import { WordListItem } from './list-item.es6';
import { DifficultySelector } from './selector.es6';

import { Router } from '../router.es6';


const Heading = ({ analysis }) =>
    <div>
        <h2 className="media">
            <img className="poster" src={ analysis.media.poster_url } />
            <span className="title">
                { analysis.media.title }
            </span>
        </h2>
        <div>
            <span className="badge">{ analysis.words.length }</span> unique words
        </div>
    </div>;


class WordList extends React.Component { 

    componentWillMount() {
        Router.onAnalysisPage(this.props.movie);
    }

    render() {
        const { analysis, difficulty, onSelectWord, onSelectDifficulty } = this.props;
        const sortedWords =
            analysis.words.sort((a, b) => a.difficulty.value - b.difficulty.value);

        const wordsWithDifficulty =
            sortedWords.filter(w => w.difficulty.level === difficulty);

        return <div className="word-list">
            <Heading analysis={analysis} />

            <DifficultySelector
                selected={difficulty}
                onSelect={onSelectDifficulty}
                words={sortedWords} />

            <div className="list">
                { wordsWithDifficulty.map(item =>
                    <WordListItem key={item.token} word={item} 
                                onSelect={onSelectWord} /> )}
            </div>
        </div>;
    }
}


export { WordList };
