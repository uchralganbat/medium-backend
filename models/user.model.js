const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: String,
    hash: { type: String, required: true },
    provider: String,
    provider_id: String,
    token: String,
    provider_pic: String,
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    role: { type: String, enum: ['admin', 'restricted'], required: true, default: 'restricted' },
    createdDate: { type: Date, default: Date.now }
});

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', UserSchema);