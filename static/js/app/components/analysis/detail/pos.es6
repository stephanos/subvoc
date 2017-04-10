import React from 'react';


const WordPartOfSpeachHeader = ({ active, enabled, label, freq, onSelectPOS }) => {
    const classNames = `tab card ${enabled ? '' : 'empty'} ${active ? 'active' : ''}`;
    return <div onClick={() => enabled ? onSelectPOS(label) : null} className={classNames} >
        <div className="label">
            { label }
        </div>
        { freq ? <div className="count badge">{ freq }</div> : <div className="count">&nbsp;</div> }
    </div>;
};


export { WordPartOfSpeachHeader };
