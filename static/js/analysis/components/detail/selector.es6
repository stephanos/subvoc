import $ from 'jquery';
import React from 'react';


class WordPartOfSpeachHeader extends React.Component {
    render() {
        const { active, enabled, label, freq, onSelectPOS } = this.props;
        const classNames = `tab card ${enabled ? '' : 'empty'} ${active ? 'active' : ''}`;
        return <div onClick={() => enabled ? onSelectPOS(label) : null} className={classNames} >
            <div className="label">
                { label }
            </div>
            { freq ? <div className="count badge">{ freq }</div> : <div className="count">&nbsp;</div> }
        </div>;
    }
}


export { WordPartOfSpeachHeader };
