import koa from 'koa';
import koaRouter from 'koa-router';
import { connectToDb } from './db/Connection.js';
import ThreadsController from './controllers/ThreadsController.js';
import CommentsController from './controllers/CommentsController.js';

const app = new koa();
const router = new koaRouter();
const dbInstanceMongoose = connectToDb();
const threadsController = new ThreadsController(dbInstanceMongoose);
const commentsController = new CommentsController(dbInstanceMongoose);

router.get('/list', listThreads);
router.get('/thread/create', createThread);
router.get('/comment/add', addComment);
router.get('/404', notFound);

// THREADS

async function listThreads(ctx) {
    const threads = await threadsController.list();

    //console.log(threads);

    ctx.body = threads;
}

function createThread(ctx) {
    // TODO: check if successfull
    threadsController.create('Mladen', 'This is my first thread.');

    ctx.body = 'The thread was created successfully!';
}

// COMMENTS

async function addComment(ctx) {
    // TODO: check if successfull
    await commentsController.create('61790a8202b3c549fa0ebdd8', 'Mladen', 'This is my first comment.');

    ctx.body = 'The comment was created successfully!';
}

// INFRASTRUCTURE

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