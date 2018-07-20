const messages = require('./errorMessage');

function messageError(key) {
    let { code, msg, status } = messages[key] || messages.CommonErr;
    const err = new Error(msg);
    err.code = code;
    err.status = status;
    return err;
}

module.exports = {
    messageError
}
