module.exports = {
    AuthFail: { code: 10001, msg: `jwt token error.`, status: 403 },
    CommonErr: { code: 11000, status: 200 },
    NotFound: { code: 10002, msg: '请求的资源不存在', status: 401 }
}
