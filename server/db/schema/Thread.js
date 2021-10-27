import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const threadSchema = Schema({
    _id: Schema.Types.ObjectId,
    author: String,
    content: String,
    upVotes: Number,
    downVotes: Number,
    createdOn: Date,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});