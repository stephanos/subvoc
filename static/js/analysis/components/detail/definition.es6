import $ from 'jquery';
import preact from 'preact';


class WordDefinitionList extends preact.Component {
    render({ definitions }) {
        return <div>
            <h4>
                Definition
            </h4>
            <ol>
                { $.map(definitions, (entry) =>
                    <li class="explanation">
                        { entry.definition }
                    </li>
                ) }
            </ol>
        </div>;
    }
}


export { WordDefinitionList };
