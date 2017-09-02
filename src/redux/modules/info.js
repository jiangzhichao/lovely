const LOAD = 'redux-example/LOAD';
const LOAD_SUCCESS = 'redux-example/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/LOAD_FAIL';
const TEST_PROXY = 'text';

const TEXT = 'text';

const initialState = {
    loaded: false
};

export default function info(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                loading: true
            };
        case LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                data: action.result
            };
        case LOAD_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error
            };
        case TEXT:
            return {
                ...state,
                text: action.text
            };
        case TEST_PROXY:
            return {
                ...state,
                testData: action.result
            };
        default:
            return state;
    }
}

export function isLoaded(globalState) {
    return globalState.info && globalState.info.loaded;
}

export function load() {
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: (client) => client.get('/loadInfo')
    };
}

export function changeText(text) {
    return { type: TEXT, text };
}

export function testProxy() {
    return {
        types: [TEST_PROXY],
        promise: (client) => client.get('/freq/diy/band/node/get', { params: { areaCode: 5201, userId: '123456' } })
    };
}
