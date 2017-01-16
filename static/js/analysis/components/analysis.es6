import $ from 'jquery';
import preact from 'preact';


class Analysis extends preact.Component {
    render(props) {
        return <table>
            { $.map(props.data.words, item =>
                <tr>
                    <td> { item.word.token } </td>
                    <td> { item.word.type } </td>
                    <td> { item.freq } </td>
                </tr>
            ) }
        </table>
    }
}


export { Analysis }
