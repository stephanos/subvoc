import $ from 'jquery';
import preact from 'preact';


class WordDefinitionList extends preact.Component {
    render({ definitions }) {
        return <div class="definitions">
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
                    None were found.
                </div>
            }
        </div>;
    }
}


export { WordDefinitionList };
