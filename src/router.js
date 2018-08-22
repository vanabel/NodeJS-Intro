// file: router.js

var path = require('path');

function route(handle, fpath, res, postdata){
    var hpath = fpath,
        ext = path.extname(hpath),
        extarr = ['.js', '.map', '.css'];
    if ( extarr.indexOf(ext)>-1 ) {
        hpath = '/getfile';
    }
    console.log('Handle request from: ' + fpath);
    if (typeof handle[hpath] === 'function' ){
        if (hpath === '/post'){
            return handle[hpath](fpath, res, postdata);
        } else {
            return handle[hpath](fpath, res);
        }
    } else {
        console.log('404 not found');
        res.writeHead(404, {'content-type': '404 not found'});
        res.end();
    }
}

exports.route = route;
