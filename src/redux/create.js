import { createStore as _createStore, applyMiddleware } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

export default function createStore(history, client) {
    const reduxRouterMiddleware = routerMiddleware(history);
    const middleware = [createMiddleware(client), reduxRouterMiddleware, thunk];

    const finalCreateStore = applyMiddleware(...middleware)(_createStore);
    const reducer = require('./modules/reducer');
    const store = finalCreateStore(reducer);

    if (__DEVELOPMENT__ && module.hot) {
        module.hot.accept('./modules/reducer', () => {
            store.replaceReducer(require('./modules/reducer'));
        });
    }

    return store;
}
