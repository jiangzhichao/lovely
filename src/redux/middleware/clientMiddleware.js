export default function clientMiddleware(client) {
    return ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') return action(dispatch, getState);

        const { promise, types, ...rest } = action;
        if (!promise) return next(action);

        const actionPromise = promise(client);
        switch (types.length) {
            case 1: {
                const [SUCCESS] = types;
                actionPromise.then(
                    result => next({ ...rest, result, type: SUCCESS }),
                    err => err
                );
                return actionPromise;
            }
            case 2: {
                const [SUCCESS, FAILURE] = types;
                actionPromise.then(
                    result => next({ ...rest, result, type: SUCCESS }),
                    error => next({ ...rest, error, type: FAILURE })
                );
                return actionPromise;
            }
            case 3: {
                const [REQUEST, SUCCESS, FAILURE] = types;
                next({ ...rest, type: REQUEST });
                actionPromise.then(
                    result => next({ ...rest, result, type: SUCCESS }),
                    error => next({ ...rest, error, type: FAILURE })
                );
                return actionPromise;
            }
            default: {
                console.error('参数types异常');
                return Promise.reject({ message: '参数types异常' });
            }
        }
    };
}
