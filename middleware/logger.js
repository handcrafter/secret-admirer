const moment = require('../client/node_modules/moment');

//middleware
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}:${moment().format()}`);
    next();
}

module.exports = logger;
