import React from 'react';


const WordDefinitionList = ({ definitions }) =>
    <div className="definitions">
        <h4>
            Definition
        </h4>
        { definitions.length > 0
            ? <div>
                <ol>
                    { definitions.map((entry, idx) =>
                        <li key={idx} className="definition">
                            { entry.definition }
                        </li>
                    ) }
                </ol>
            </div>
            : <div>
                None was found.
            </div>
        }
    </div>;


export { WordDefinitionList };
