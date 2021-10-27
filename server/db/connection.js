var mongoose = require('mongoose');

const connectToDb = function () {
    // TODO: change and move connection string to config file
    mongoose.connect('mongodb://localhost:27017/react-like-app-db', {
        keepAlive: true,
        keepAliveInitialDelay: 300000
    })
        .catch(error => console.log(error));

    mongoose.connection.on('error', err => {
        console.log(err);
    });

    const thread = mongoose.model('Thread', threadSchema);
    const comment = mongoose.model('Comment', commentSchema);

    return {
        mongoose,
        thread,
        comment
    };
};