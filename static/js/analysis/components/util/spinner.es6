import preact from 'preact';


class Spinner extends preact.Component {
    render() {
        return <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
    }
}


export { Spinner }
