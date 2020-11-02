'use strict';

const axios = require('axios');
const https = require('https');
const { createWriteStream } = require('fs');

function http_download(url, local_file_pathname) {
    return new Promise((resolve) => {
        axios({
            url: url,
            method: 'GET',
            headers: { Accept: '*/*' },
            responseType: 'stream',
            httpsAgent: new https.Agent({rejectUnauthorized: false}),
            timeout: 6000
        }).then(response => {
            const writer = createWriteStream(local_file_pathname);
            response.data.pipe(writer);
            writer.on('finish', () => { 
                resolve(true); 
            });
            writer.on('error', () => {
                resolve('failed to stream to file for http_download: ' + url);
            });
        }).catch(err => {
            console.error(err.message + ' for ' + url);
            if (err.response && err.response.data) {
                console.error(err.response.headers);
                //console.error(err.response.data);
            } else if (err.request) {
                console.error(err.request);
            }
            resolve(err.message);
        });
    });
}

module.exports = http_download;