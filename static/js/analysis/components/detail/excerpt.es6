import $ from 'jquery';
import preact from 'preact';


class WordExcerptList extends preact.Component {
    render({ excerpts }) {
        return <div> { (excerpts && excerpts.length > 0)
            ? <div class="excerpts">
                <h4>
                    Excerpt
                </h4>
                { $.map(excerpts, (excerpt) =>
                    <div class="example">
                        { $.map(excerpt.sentences, (sentence) =>
                            <span>{ sentence.text }</span>
                        ) }
                    </div> ) }
            </div>
            : <div></div>
        } </div>;
    }
}


export { WordExcerptList };
