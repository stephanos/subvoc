import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app.es6';

function render() {
    const container = document.getElementById('main');
    ReactDOM.render(<App />, container);
}

window.onload = render;