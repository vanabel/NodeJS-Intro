// file: routeHander
var fs = require('fs');
var path = require('path');
var showdown = require('showdown'),
    converter = new showdown.Converter();
var mjpage = require('mathjax-node-page').mjpage,
    config = {
        MathJax: {
            tex2jax: {inlineMath: [['$','$'],['\\\\(','\\\\)']]}
        },
        format: 'TeX'
    },
    nodeconfig = {
        mml: true
    };

var html = 'The html content.';

function get(fpath, res){
    console.log('Get handler is called.');

    if (fpath === '/' ) {
        fpath = '/index.html';
    }
    if (path.extname(fpath) === '.js') {
        res.writeHead(200, {'content-type': 'text/javascript'});
    }
    if (path.extname(fpath) === '.css') {
        res.writeHead(200, {'content-type': 'text/css'});
    }
    if (path.extname(fpath) === '.html') {
        res.writeHead(200, {'content-type': 'text/html; charset=utf-8'});
    }

    fs.readFile(__dirname + fpath, function(err, data){
        if (err)  {
            throw err;
        }
        html = data.toString();
        console.log(fpath);
        res.write(html);
        res.end();
    });
}

function post(fpath, res, data){
    console.log('Post handler is called.');
    data = converter.makeHtml(data);
    console.log(data);
    res.writeHead(200, {'content-type': 'text/html; charset=utf-8'});
    if (data.match(/\$[^$]*?\$/g)){
        mjpage(data, config, nodeconfig, function(o){
            var mml = o.replace(/\s*<\/?(html|body|head)>\s*/gm, '');
            console.log(mml);
            res.write(mml);
            res.end();
        });
    } else {
        res.write(data);
        res.end();
    }
}

exports.get = get;
exports.post = post;
