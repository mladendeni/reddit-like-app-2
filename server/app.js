const koa = require('koa');
const koaRouter = require('koa-router');
const connectToDb = require('./db/connection.js');

const app = new koa();
const router = new koaRouter();
const dbInstanceMongoose = connectToDb();
const Thread = dbInstanceMongoose.thread;
const Comment = dbInstanceMongoose.comment;

router.get('/hello', getMessage);
router.get('/hello/:id', sendId);
router.get('/404', notFound);

async function getMessage(ctx) {
    const threads = await Thread.find();
    console.log(threads);

    ctx.body = "Hello world!";
}

function sendId(ctx) {
    ctx.body = 'The id you specified is ' + ctx.params.id;

    var newThread = new Thread({
        author: 'Mladen',
        content: 'This is my first thread.',
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

function notFound(ctx) {
    ctx.body = '404: Not Found!';
}

const handle404 = ctx => {
    if (404 != ctx.status) {
        return;
    }

    ctx.redirect('/404');
};

const errorHandling = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = { message: err.message };
        ctx.app.emit('error', err, ctx);
    }
};

app.use(errorHandling);
app.use(router.routes());
app.use(handle404);
app.listen(3001);