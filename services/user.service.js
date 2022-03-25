const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const db = require('_helpers/db');
const Role = require('../_helpers/role');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    _delete
}

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if(user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret, { expiresIn: '7d'});
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function getAll() {
    return await User.find();
}

async function getById(id) {
    return await User.findById(id);
}

async function create(userParam) {
    if(await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    
    const user = new User(userParam);

    if(userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    await user.save()
    
    if(user && bcrypt.compareSync(userParam.password, user.hash)) {
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret, { expiresIn: '7d'});
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save(); 
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

