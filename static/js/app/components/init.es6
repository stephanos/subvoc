import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app.es6';
import { Router } from './router.es6';


function init() {
    const page = Router.getPage(location.pathname);
    const container = document.getElementById('main');
    ReactDOM.render(<App page={page}/>, container);
}

window.onload = init;