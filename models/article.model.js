const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
    {
        text: String,
        title: String,
        description: String,
        feature_img: { type: Array, default: []},
        claps: { type: Number, default: 0 },
        state: { type: String, required: true, default: 'pending' },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [
            {
                author: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                text: String
            }
        ],
        createdAt: { type: Date, default: Date.now }
    }
)

ArticleSchema.methods.clap = function() {
    this.claps++
    return this.save()
}

ArticleSchema.methods.comment = function(comment) {
    this.comments.push(comment)
    return this.save()
}

ArticleSchema.methods.addAuthor = function(author_id) {
    this.author = author_id
    return this.save()
}

ArticleSchema.methods.getUserArticle = function(_id) {
    Article.find({'author': _id }.then((article) => {
        return article
    }))
}

module.exports = mongoose.model('Article', ArticleSchema)