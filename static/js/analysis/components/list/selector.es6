import $ from 'jquery';
import preact from 'preact';


const DifficultyGroup = ({ level, label, count, active, onSelect }) => {
    const classNames = `group card ${ active ? 'active' : '' }`;
    return <div class={classNames} onclick={() => onSelect(level)}>
        <div class="label">
            { label.toLowerCase() }
        </div>
        <div class="count badge">
            { count }
        </div>
    </div>;
}


const DifficultySelector = ({ selected, onSelect, words }) => {
    const groups = {};
    $(words).each(function(idx, word) {
        groups[word.difficulty.label] = {
            level: word.difficulty.level,
            count: (groups[word.difficulty.label] || { count: 0 }).count + 1,
        }
    });

    return <div class="difficulty">
        { $.map(Object.keys(groups),
            (label) => {
                const group = groups[label];
                return <DifficultyGroup
                            level={group.level}
                            count={group.count}
                            active={selected === group.level}
                            label={label.toLowerCase()}
                            onSelect={onSelect} />
            })
        }
    </div>
}


export { DifficultySelector };
