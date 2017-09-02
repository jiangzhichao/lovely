import superagent from 'superagent';
const methods = ['get', 'post', 'put', 'patch', 'del'];

const formatUrl = (path) => '/sam/api' + (path[0] !== '/' ? '/' + path : path);

export default new class ApiClient {
    constructor() {
        methods.forEach((method) =>
            this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
                const request = superagent[method](formatUrl(path));

                if (params) {
                    request.query(params);
                }

                if (data) {
                    request.send(data);
                }

                request.end((err, { text } = {}) => (err || !text || JSON.parse(text).errcode === 0) ? reject(text ? JSON.parse(text) : err) : resolve(JSON.parse(text)));
            }));
    }
};
