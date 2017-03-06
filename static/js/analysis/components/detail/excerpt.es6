import $ from 'jquery';
import preact from 'preact';


const WordExcerptList = ({ excerpts }) =>
    <div> { excerpts.length > 0
        ? <div class="excerpts">
            <h4>
                Excerpt
            </h4>
            { $.map(excerpts, (excerpt) =>
                <div class="excerpt">
                    { $.map(excerpt.sentences, (sentence) =>
                        <div class="line">{ sentence.text }</div>
                    ) }
                </div> ) }
        </div>
        : <div></div>
    } </div>;


export { WordExcerptList };
