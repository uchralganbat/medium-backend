const jwt = require('express-jwt')
const { secret } = require('config.json')

module.exports = authorize 

function authorize(roles = []) {
    if (typeof roles == 'string') {
        roles = [roles];
    }

    return [
        jwt({ secret, algorithms: ['HS256']}),
        (req, res, next) => {
            if(roles.length > 0 && !roles.includes(req.user.role)) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            next();
        }
    ];
}