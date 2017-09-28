import { message } from 'antd';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export default function clientMiddleware(client) {
    return ({ dispatch, getState }) => {
        return next => action => {
            if (typeof action === 'function') {
                return action(dispatch, getState);
            }

            const { promise, types, ...rest } = action;
            if (!promise) {
                return next(action);
            }

            const [REQUEST, SUCCESS, FAILURE] = types;
            next({ ...rest, type: REQUEST });
            next(showLoading());

            const actionPromise = promise(client);
            actionPromise.then(
                (result) => {
                    next(hideLoading());
                    return next({ ...rest, result, type: SUCCESS });
                },
                (error) => {
                    next(hideLoading());
                    message.error(error.msg);
                    return next({ ...rest, error, type: FAILURE });
                }
            ).catch((error) => {
                message.error('MIDDLEWARE ERROR:', error);
                next(hideLoading());
                return next({ ...rest, error, type: FAILURE });
            });

            return actionPromise;
        };
    };
}
