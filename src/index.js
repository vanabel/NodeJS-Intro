// file: index.js
var server=require('./server');
var router=require('./router');
var handler=require('./routeHandler');

var handle = {};
handle['/'] = handler.get;
handle['/getfile'] = handler.get;
handle['/post'] = handler.post;

server.init(handle, router.route);
