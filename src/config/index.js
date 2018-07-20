module.exports = {
    PORT: 44444,
    DEBUG: true,

    JWT_SECRET: 'ypwlal_xj_jiajun',
    JWT_TOKEN_TIMEOUT: 30 * 60 * 1000, // 30 mins

    // no auth path
    NO_AUTH_REG: /\.log$|\.ico$|^\/socket.io/,
    NO_AUTH_PATHS: [
        '/',
        '/monitor',
        '/login',
        '/register',
    ],

    API_LOG_PATH: `${__dirname}/../../log/`
}
