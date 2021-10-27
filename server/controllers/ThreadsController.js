class ThreadsController {
    constructor(dbInst) {
        this.mongoose = dbInst.mongoose;
        this.threadModel = dbInst.thread;
    }

    async list() {
        const threads = await this.threadModel.find().populate('comments');

        return threads;
    }

    create(author, content) {
        var newThread = new this.threadModel({
            _id: new this.mongoose.Types.ObjectId(),
            author: author,
            content: content,
            upvotes: 0,
            downvotes: 0,
            createdOn: Date.now(),
            comments: []
        });

        newThread.save(function (err, res) {
            if (err) {
                console.error(err);
            }
            else {
                console.info('Thread saved!');
            }
        });
    }
}

export default ThreadsController;