import $ from 'jquery';
import preact from 'preact';


const WordExcerpt = ({ excerpt }) =>
    <div class="excerpt">
        { $.map(excerpt.sentences, (sentence) => {
            const words = sentence.text.split(/\b/);
            console.log(words)
            return <div class="line">
                { $.map(words, (word) => {
                    const className = word === excerpt.token ? 'token' : '';
                    return <span class={className}>{ word }</span>;
                })}
            </div>;
        })}
    </div>;


const WordExcerptList = ({ excerpts }) =>
    <div> { excerpts.length > 0
        ? <div class="excerpts">
            <h4>
                Excerpt
            </h4>
            { $.map(excerpts, (excerpt) => <WordExcerpt excerpt={excerpt} />) }
        </div>
        : <div></div>
    } </div>;


export { WordExcerptList };
