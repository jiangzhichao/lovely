import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
    Home,
    App,
    NotFound
} from 'containers';

export default (store) => {
    console.log(store);
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="*" component={NotFound} status={404} />
        </Route>
    );
};
