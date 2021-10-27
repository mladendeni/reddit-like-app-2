class CommentsController {
    constructor(dbInst) {
        this.mongoose = dbInst.mongoose;
        this.threadModel = dbInst.thread;
        this.commentModel = dbInst.comment;
    }

    async getCommentsForThread(threadId) {
        // TODO: add validation

        const comments = await this.commentModel.find({ thread: threadId });

        return comments;
    }

    async create(threadId, author, content) {
        // TODO: add validation

        var newComment = new this.commentModel({
            _id: new this.mongoose.Types.ObjectId(),
            author: author,
            content: content,
            upvotes: 0,
            downvotes: 0,
            createdOn: Date.now(),
            thread: threadId
        });

        newComment.save(function (err, res) {
            if (err) {
                console.error(err);
            }
            else {
                console.info('Comment saved!');
            }
        });

        const thread = await this.threadModel.findOne({ thread: threadId });

        thread.comments.push(newComment);
        thread.save();
    }
}

export default CommentsController;