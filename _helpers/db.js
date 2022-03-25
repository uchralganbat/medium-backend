const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions)
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user.model'),
    Article: require('../models/article.model')
};