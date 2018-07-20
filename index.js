require('babel-register');
require('babel-polyfill');
const os = require('os');
const cluster = require('cluster');
var workers = process.env.WORKERS || os.cpus().length;
var env = process.env.NODE_ENV;
if (cluster.isMaster && env !== 'development') {
    console.log('workers', workers)
    for (var i = 0; i < workers; ++i) {
        var worker = cluster.fork().process;
        console.log('server %s started.', worker.pid);
    }
    cluster.on('exit',
        (worker) => {
            console.log('server %s died. restart...', worker.process.pid);
            cluster.fork();
        });
} else {
    require('./server/server');
}