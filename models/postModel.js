const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema (
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        likes: {
            type: Number,
            default: 0,
        },
        comments: {
            type: String,
            user: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Post', postSchema);