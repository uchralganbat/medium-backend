const express = require('express');
const router = express.Router();
const articleService = require('../services/article.service');
const authorize = require('../_helpers/authorize');
const uploader = require('../_helpers/uploader');

router.post('/submit', authorize(), uploader.array('images'), submitArticle);
router.post('/clap', clapArticle);
router.post('/comment', authorize(), commentArticle);
router.get('/', getAll);
router.get('/:id', getArticle);
router.get('/my', authorize(), getUserArticle);
router.delete('/', authorize(), _delete);

module.exports = router;

function submitArticle(req, res, next) {
    articleService.submitArticle(req.body, req.files, req.user.sub)
        .then(() => res.json({ message: 'article pending', path: req.files.map(file => file.path), id: req.user.sub }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    articleService.getAll()
        .then(articles => res.json(articles))
        .catch(err => next(err))
}

function clapArticle(req, res, next) {
    articleService.clapArticle(req.body.article_id)
        .then(() => res.json({ message: 'Done' }))
        .catch(err => next(err));
}

function commentArticle(req, res, next) {
    articleService.commentArticle(req.body, req.user.sub)
        .then(() => res.json({ message: 'Done'}))
        .catch(err => next(err));
}

function getArticle(req, res, next) {
    articleService.getArticle(req.params.article_id)
        .then((article) => res.json({article}))
        .catch(err => next(err));
}

function getUserArticle(req, res, next) {
    articleService.getUserArticle(req.user.sub)
        .then((articles) => res.json({ articles }))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    articleService._delete(req.body.article_id, req.user.sub)
        .then((message) => res.json({ message }))
        .catch(err => next(err));
}