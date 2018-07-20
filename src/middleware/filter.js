module.exports = (req, res, next) => {
    // 1. intercept request on favicon.ico
    if (req.path === '/favicon.ico') {
        return res.status(204).end()
    }
    next()
}