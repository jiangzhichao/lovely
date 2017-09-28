import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import info from './info';

export default combineReducers({
    routing,
    loadingBar,
    info,
});
