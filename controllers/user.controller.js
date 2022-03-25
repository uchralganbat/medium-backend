const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');
const authorize = require('../_helpers/authorize');
const Role = require('_helpers/role');

//routes
router.post('/authenticate', authenticate) // public route
router.post('/register', register) // public route
router.get('/', authorize(Role.Admin), getAll) // admin only
router.get('/:id', authorize(Role.Admin), getById) // admin only
router.put('/:id', authorize(), update) // authenticated users
router.delete('/:id', authorize(), _delete) // authenticated users

module.exports = router;

function register(req, res, next) {
    userService.create(req.body)
        .then((user) => user ? res.json(user) : res.status(400).json({ message: 'Register information is incorrect'}))
        .catch(err => next(err));
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect'}))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService._delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}