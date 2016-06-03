const http = require('http');
const {readFileAsync,
    writeFileAsync,
    getBody} = require('./util.js');

const query = './query.txt';

const handler = {
    POST({res, req}) {
        return Promise.resolve()
        .then(() => {
            return readFileAsync(query)
            .then(data => {
                res.end(data);
            })
            .catch(error => {
                res.end('New query file created');
            });
        })
        .then(() => {
            return getBody(req);
        })
        .then(body => {
            return writeFileAsync(query, body);
        })
        .catch(error => {
            res.end('Internal Error');
        })
    },
    GET({res}) {
        readFileAsync(query)
        .then(data => {
            res.end(data);
        })
        .catch(error => {
            if (error.code === 'ENOENT') {
                return writeFileAsync(query)
                .then(data => {
                    res.end('New query file created');
                });
            }
            res.end('Internal Error');
        })
    }
}

const server = http.createServer((req, res) => {
    if (!Object.keys(handler).includes(req.method)) {
        return res.end('Only for POST or GET requests');
    }
    handler[req.method]({req, res});
});

server.listen(8080);
