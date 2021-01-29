'use strict';

const chai = require('chai');
const expect = chai.expect;

const http_download = require('../');

describe('Test http download', () => {

    it('simple download', async () => {
        const url = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
        const local_file_pathname = '/tmp/test.png';
        const result = await http_download(url, local_file_pathname);
        //console.log('result', result);
        expect(result).to.not.equal(null);
        expect(result).to.not.equal(false);
        expect(result.ok).to.equal(true);
        expect(result.status).to.equal(200);
        expect(result.content_type).to.equal('image/png');
    });

    it('simple 404 download', async () => {
        const url = 'https://google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
        const local_file_pathname = '/tmp/test.png';
        const result = await http_download(url, local_file_pathname);
        //console.log('result', result);
        expect(result).to.not.equal(null);
        expect(result).to.not.equal(false);
        expect(result.ok).to.equal(false);
        expect(result.status).to.equal(404);
    });

});

