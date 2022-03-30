const db = require('_helpers/db');
const cloudinary = require('cloudinary');
const User = db.User;
const Article = db.Article;

module.exports = {
    submitArticle,
    getAll,
    clapArticle,
    commentArticle,
    getArticle,
    getUserArticle,
    updateArticle,
    approveArticle,
    _delete
}

async function submitArticle(articleParams, images, author_id) {
    let { text, title, description } = articleParams
    let feature_img = []
    if (images.length > 0) {
        images.map(image => feature_img.push(image.path));
    } 
    const article = new Article({ text, title, description, feature_img });
    article.addAuthor(author_id);
    console.log(article)
}

async function getAll() {
    return await Article.find()
        .populate('author')
        .populate('comments.author');
}

async function clapArticle(article_id){
    const article = await Article.findById(article_id);
    article.clap();
}

async function commentArticle(params, user_id){
    let { article_id, comment } = params;
    const article = await Article.findById(article_id);
    article.comment({ author: user_id, text: comment });
    console.log(article);
}

async function getArticle(article_id) {
    return await Article.findById(article_id)
        .populate('author')
        .populate('comments.author');
}

async function getUserArticle(author_id) {
    return await Article.find({'author': author_id});
}

async function updateArticle(article_id, params, images) {
    let article = await Article.findById(article_id);
    if(!article) throw 'article not found';
    article.feature_img = images
    Object.assign(article, params);
    article.save();
}

async function approveArticle(article_id) {
    await Article.findByIdAndUpdate(article_id, {'state': 'approved'});
}

async function _delete(article_id) {
    await Article.findByIdAndRemove(article_id);    
}
// getAll: (req, res, next) => {
//     Article.find(req.params.id)
//     .populate('author')
//     .populate('comments.author').exec((err, article)=> {
//         if (err)
//             res.send(err)
//         else if (!article)
//             res.send(404)
//         else
//             res.send(article)
//         next()            
//     })
// },
// clapArticle: (req, res, next) => {
//     Article.findById(req.body.article_id).then((article)=> {
//         return article.clap().then(()=>{
//             return res.json({msg: "Done"})
//         })
//     }).catch(next)
// },

// /**
//  * comment, author_id, article_id
//  */
// commentArticle: (req, res, next) => {
//     Article.findById(req.body.article_id).then((article)=> {
//         return article.comment({
//             author: req.body.author_id,
//             text: req.body.comment
//         }).then(() => {
//             return res.json({msg: "Done"})
//         })
//     }).catch(next)
// },

// /**
//  * article_id
//  */
// getArticle: (req, res, next) => {
//     Article.findById(req.params.id)
//     .populate('author')
//     .populate('comments.author').exec((err, article)=> {
//         if (err)
//             res.send(err)
//         else if (!article)
//             res.send(404)
//         else
//             res.send(article)
//         next()            
//     })
// }