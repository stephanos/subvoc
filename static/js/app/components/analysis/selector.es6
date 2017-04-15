import React from 'react';


const DifficultyGroup = ({ level, label, count, active, onSelect }) => {
    const classNames = `group card ${ active ? 'active' : '' }`;
    return <div className={classNames} onClick={() => onSelect(level)}>
        <div className="label">
            { label.toLowerCase() }
        </div>
        <div className="count badge">
            { count }
        </div>
    </div>;
};


const DifficultySelector = ({ selected, onSelect, words }) => {
    const groups = {};
    words.forEach((word) => {
        groups[word.difficulty.label] = {
            level: word.difficulty.level,
            count: (groups[word.difficulty.label] || { count: 0 }).count + 1,
        };
    });

    return <div className="difficulty">
        { Object.keys(groups).map((label) => {
            const group = groups[label];
            return <DifficultyGroup
                        key={group.level}
                        level={group.level}
                        count={group.count}
                        active={selected === group.level}
                        label={label.toLowerCase()}
                        onSelect={onSelect} />;
        }) }
    </div>;
};


export { DifficultySelector };
