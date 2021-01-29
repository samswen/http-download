'use strict';

const axios = require('axios');
const https = require('https');
const { createWriteStream } = require('fs');

function http_download(url, local_file_pathname, options = {timeout: 60000}) {
    return new Promise((resolve) => {
        axios({
            url: url,
            method: 'GET',
            headers: { Accept: '*/*' },
            responseType: 'stream',
            httpsAgent: new https.Agent({rejectUnauthorized: false}),
            ...options
        }).then(response => {
            const status = response.status;
            const content_type = response.headers['content-type'];
            const writer = createWriteStream(local_file_pathname);
            response.data.pipe(writer);
            writer.on('finish', () => { 
                resolve({ok: true, status, content_type}); 
            });
            writer.on('error', () => {
                resolve({ok: false, status, content_type});
            });
        }).catch(err => {
            const message = err.message;
            if (err.response) {
                const status = err.response.status;
                const data = err.response.data;
                resolve({ok: false, status, message});
            } else {
                resolve(false);
            }
        });
    });
}

module.exports = http_download;
