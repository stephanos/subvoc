import $ from 'jquery';
import preact from 'preact';


class WordExcerptList extends preact.Component {
    render({ examples }) {
        return <div>
            { $.map(examples, (example) =>
                <div class="example">
                    { example.text }
                </div>
            ) }
        </div>
    }
}


export { WordExcerptList }
