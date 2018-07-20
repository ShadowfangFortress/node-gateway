// use for valid jwt
const jwtSvc = require('../service/jwt');
const config = require('../config');

const { messageError } = require('../utils/errorHandle');

function isNotAuthPath(path) {
    return config.NO_AUTH_PATHS.includes(path) || config.NO_AUTH_REG.test(path)
}

module.exports = async (req, res, next) => {
    // no-need auth
    if (isNotAuthPath(req.path)) {
        return next()
    }

    const { authorization } = req.headers;
    if (!authorization) {
        return next(messageError('AuthFail'));
    }

    const token = authorization.substr(7);

    let payload;
    try {
        payload = await jwtSvc.valid(token); 
    } catch (err) {
        return next(messageError('AuthFail'));
    }
    if (!payload) {
        return next(messageError('AuthFail'));
    }
    req.auth = payload;
    next();
}
