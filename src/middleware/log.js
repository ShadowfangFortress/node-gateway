const express = require('express');
const config = require('../config');
const logger = require('../utils/logger')(config.API_LOG_PATH);

logger.info(`service starts at ${config.PORT}\n`);

function getClientIp(request) {
    const ip = request.headers['x-forwarded-for'] ||
                request.ip ||
                request.connection.remoteAddress ||
                request.socket.remoteAddress ||
                request.connection.socket.remoteAddress || ''
    if (ip && ip.indexOf(':') != -1) {
        return ip.split(':')[3] || '127.0.0.1'
    }
    return ip
}

module.exports = (req, res, next) => {
    const str = `${getClientIp(req)}-- ${req.method} ${req.url} ${req.headers.referer || '-'} ${req.headers['user-agent']}`;
    logger.info(str + '\n');
    next();
}
