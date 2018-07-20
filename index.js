const express = require('express');
const bodyParser = require('body-parser');
const { messageError } = require('./src/utils/errorHandle');

const config = require('./src/config');
const {
    filter,
    auth,
    jwt,
    cors,
    log,
    monitor
} = require('./src/middleware');

const app = new express();

app.use(filter);
app.use(monitor);
app.use(bodyParser.json());
app.use(bodyParser.text({ type: '*/xml' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(log);
app.use(cors);
app.use(auth);
app.use(jwt);
app.use((req, res, next) => {
    next(messageError('NotFound', req.url));
});

app.use((err, req, res, next) => {
    const { code = -1, message } = err;
    res.status(err.status).json({ code, message });
});

app.listen(config.PORT);

process.on('unhandledRejection', err => {
    console.log('Unhandled Rejection: ', err)
});
