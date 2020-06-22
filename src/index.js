/* global chrome */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StartUp from './StartUp';
import * as serviceWorker from './serviceWorker';
import App from './App';
chrome.storage.sync.get('keyStore', function (data) {
    if (data === {} || data === undefined) {
        ReactDOM.render(
            <React.StrictMode>
                <StartUp />
            </React.StrictMode>,
            document.getElementById('root'),
        );
    } else {
        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            document.getElementById('root'),
        );
    }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
