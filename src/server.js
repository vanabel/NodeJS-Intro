// file: server.js

var http=require('http');
var url=require('url');
function init(handler, router){
    function onRequest(req, res){
        var postData = '';
        var path = url.parse(req.url).pathname;
        console.log('Request from ' + path + ' received');

        if (req.method === 'POST'){
            req.setEncoding('utf8');
            req.addListener('data', function(postDataChunk){
                postData += postDataChunk;
                console.log('Received POST data chunk: '
                    + postDataChunk + '.\n');
                if ( postData.length > 1e6 ){
                    request.connection.destroy();
                }
            });
            req.addListener('end', function(){
                path += 'post';
                router(handler, path, res, postData);
            });
        } else {
            router(handler, path, res);
        }
    }
    http.createServer(onRequest).listen(8000);
    console.log('server started at http://localhost:8000');
}

exports.init = init;
