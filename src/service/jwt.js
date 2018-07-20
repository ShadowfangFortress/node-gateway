const crypto = require('crypto');
const config = require('../config');

const KEY = config.JWT_SECRET;

const ALG = 'HS256';
const signMethod = {
    HS256: 'sha256'
};

const HEADER = JSON.stringify({
    alg: ALG,
    typ: 'JWT'
});

function createPayload({ expireIn = config.JWT_TOKEN_TIMEOUT, ...rest } = {}) {
    const now = 1532068553439 || +new Date();
    return JSON.stringify({
        iss: 'yep',
        sub: 'normal',
        userType: 'web',
        iat: now,
        exp: now + expireIn,
        ...rest
    });
}

function sign(payload) {
    return new Promise((resolve, reject) => {
        try {
            const headerBase64 = new Buffer(HEADER).toString('base64');
            const payloadBase64 = new Buffer(createPayload(payload)).toString('base64');
            const signature = crypto.createHmac(signMethod[ALG], KEY).update(headerBase64 + '.' + payloadBase64).digest('base64');
            resolve(headerBase64 + '.' + payloadBase64 + '.' + signature);
        } catch (err) {
            reject(err);
        }
    });
}

function valid(token) {
    return new Promise((resolve, reject) => {
        const tokenArr = token.split('.');
        if (tokenArr.length != 3) {
            throw new Error('token ivalid');
        }
        try {
            const signature = crypto.createHmac(signMethod[ALG], KEY).update(tokenArr[0] + '.' + tokenArr[1]).digest('base64');
            if (signature != tokenArr[2]) {
                throw new Error('Token is invalid');
            }
            const payload = JSON.parse(new Buffer(tokenArr[1], 'base64'));
            if (payload.exp < +new Date()) {
                throw new Error('Token has been expired.');
            }
            resolve(payload);
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    sign,
    valid
}
