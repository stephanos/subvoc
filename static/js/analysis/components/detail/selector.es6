import $ from 'jquery';
import preact from 'preact';


class WordDetailSelector extends preact.Component {
    render({ active, enabled, code, label, freq, onSelectPOS }) {
        const classNames = `tab card ${enabled ? '' : 'empty'} ${active ? 'active' : ''}`;
        return <div onClick={() => enabled ? onSelectPOS(code) : null} class={classNames} >
            <div class="label">
                { label }
            </div>
            { freq ? <div class="count badge">{ freq }</div> : <div class="count">&nbsp;</div> }
        </div>;
    }
}


export { WordDetailSelector };
