import React from 'react';
import ReactDOM from 'react-dom';
import * as find from './util/find.es6';

import { App } from './app.es6';


const container = document.getElementById('main');
ReactDOM.render(<App />, container);