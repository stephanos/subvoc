import $ from 'jquery';
import preact from 'preact';


const WordDefinitionList = ({ definitions }) =>
    <div class="definitions">
        <h4>
            Definition
        </h4>
        { definitions.length > 0
            ? <div>
                <ol>
                    { $.map(definitions, (entry) =>
                        <li class="definition">
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
