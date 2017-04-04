import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app.es6';


window.onload = function() {
    const container = document.getElementById('main');
    ReactDOM.render(<App/>, container);
};
