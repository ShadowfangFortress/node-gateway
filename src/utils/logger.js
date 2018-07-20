const fs = require('fs');
const log4js = require('log4js');
const config = require('../config');

const moment = require('moment');
moment.locale('zh-cn');

module.exports = logPath => {
    const layout = {
        type: 'pattern',
        pattern: '%x{time} - %m',
        tokens: {
            time() {
                return moment().format('YYYY-MM-DD HH:mm:ss')
            },
        },
    };

    const appenders = {
        dateFile: {
            type: 'dateFile',
            category: 'APP',
            pattern: 'yyyyMMdd.log',
            alwaysIncludePattern: true,
            filename: logPath,
            layout,
        },
    };

    const categories = {
        default: { appenders: ['dateFile'], level: 'info' },
    };

    // non prod logs also output to console
    if (config.DEBUG) {
        appenders.console = { type: 'console', layout };
        categories.default.appenders.push('console');
    }

    fs.existsSync(logPath) || fs.mkdirSync(logPath);

    log4js.configure({
        appenders,
        categories,
        pm2: true,
    });
    return log4js.getLogger('APP-Gateway');
}
