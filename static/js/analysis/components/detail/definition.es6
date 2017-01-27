import $ from 'jquery';
import preact from 'preact';


class WordDefinitionList extends preact.Component {
    render({ definitions }) {
        return <div>
            { $.map(definitions, (entry) =>
                <div class="explanation">
                    { entry.definition }
                </div>
            ) }
        </div>;
    }
}


export { WordDefinitionList };
