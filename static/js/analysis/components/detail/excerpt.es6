import $ from 'jquery';
import preact from 'preact';


class WordExcerptList extends preact.Component {
    render({ excerpts }) {
        return <div>
            <h4>
                Excerpt
            </h4>
            { excerpts
                ? $.map(excerpts, (excerpt) =>
                    <div class="example">
                        { $.map(excerpt.sentences, (sentence) =>
                            <span>{ sentence.text }</span>
                        ) }
                    </div> )
                : <div></div>
            }
        </div>
    }
}


export { WordExcerptList };
