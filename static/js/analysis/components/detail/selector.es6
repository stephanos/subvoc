import $ from 'jquery';
import preact from 'preact';


class WordDetailSelector extends preact.Component {
    render({ active, enabled, code, label, onSelectPOS }) {
        const classNames = `tab ${enabled ? '' : 'empty'} ${active ? 'active' : ''}`;
        return <div onClick={() => enabled ? onSelectPOS(code) : null} class={classNames} >
            <span>{ label }</span>
        </div>
    }
}


export { WordDetailSelector }
