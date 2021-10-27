const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
    _id: Schema.Types.ObjectId,
    author: String,
    content: String,
    upVotes: Number,
    downVotes: Number,
    createdOn: Date,
    thread: { type: Schema.Types.ObjectId, ref: 'Thread' }
});