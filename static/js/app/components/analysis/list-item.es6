import React from 'react';


class WordListItem extends React.Component {

    render() {
        const { word, onSelect } = this.props;
        return <div className="card word-item" onClick={() => onSelect(word)}>
            <div className="label">
                { word.token }
                { word.freq > 1 ? <span className="count badge">{word.freq}</span> : <span></span> }
            </div>
            <div className="arrow right">&gt;</div>
        </div>;
    }
}


export { WordListItem };
