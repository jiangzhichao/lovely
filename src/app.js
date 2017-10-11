/**
 * Created by jiang on 2017/7/3.
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import getRoutes from './routes';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient.js';

const root = document.getElementById('root');
const store = createStore(hashHistory, new ApiClient());
const history = syncHistoryWithStore(hashHistory, store);

if (__DEVELOPMENT__ && !window.devToolsExtension) {
    const DevTools = require('./components/DevTools/DevTools');
    render(
        <Provider store={store} key="provider">
            <div>
                <Router history={history}>
                    {getRoutes(store)}
                </Router>
                <DevTools />
            </div>
        </Provider>, root
    );
}

if (!__DEVELOPMENT__) {
    render(
        <Provider store={store} key="provider">
            <Router history={history}>
                {getRoutes(store)}
            </Router>
        </Provider>, root
    );
}
