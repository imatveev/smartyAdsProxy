const fs = require('fs');

module.exports = {
    readFileAsync(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, {encoding: 'utf-8'}, (error, data) => {
                if (error) {
                    reject(error);
                }
                resolve(data);
            })
        })
    },
    writeFileAsync(path, data = '') {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, data, error => {
                if (error) {
                    reject(error);
                }
                resolve();
            })
        })
    },
    getBody(req) {
        return new Promise((resolve, reject) => {
            const body = [];
            req
            .on('data', chunk => {
                body.push(chunk);
            })
            .on('end', () => {
                resolve(Buffer.concat(body).toString());
            })
            .on('error', (error) => {
                reject(error);
            });
        });
    }
}
