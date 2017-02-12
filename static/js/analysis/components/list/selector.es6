import $ from 'jquery';
import preact from 'preact';


class DifficultyGroup extends preact.Component {
    render({ level, label, count, active, onSelect }) {
        const classNames = `group card ${ active ? 'active' : '' }`;
        return <div class={classNames} onclick={() => onSelect(level)}>
            <div class="label">
                { label.toLowerCase() }
            </div>
            <div class="count badge">
                { count }
            </div>
        </div>
    }
}


class DifficultySelector extends preact.Component {

    constructor(props) {
        super(props);

        const groups = {};
        $(props.words).each(function(idx, word) {
            groups[word.difficulty.label] = {
                level: word.difficulty.level,
                count: (groups[word.difficulty.label] || { count: 0 }).count + 1,
            }
        });

        this.state = { groups };
    }

    render({ selected, onSelect, words }) {
        return <div class="difficulty">
            { $.map(Object.keys(this.state.groups),
                (label) => {
                    const group = this.state.groups[label];
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
}


export { DifficultySelector };
