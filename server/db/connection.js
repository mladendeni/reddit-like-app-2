import { threadSchema } from './schema/Thread.js';
import { commentSchema } from './schema/Comment.js';
import mongoose from 'mongoose';
const { connect, connection, model } = mongoose;

export const connectToDb = function () {
    // TODO: change and move connection string to config file
    connect('mongodb://localhost:27017/react-like-app-db', {
        keepAlive: true,
        keepAliveInitialDelay: 300000
    })
        .catch(error => console.log(error));

    connection.on('error', err => {
        console.log(err);
    });

    const thread = model('Thread', threadSchema);
    const comment = model('Comment', commentSchema);

    return {
        mongoose,
        thread,
        comment
    };
};