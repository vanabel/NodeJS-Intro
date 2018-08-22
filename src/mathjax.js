var mjpage = require('mathjax-node-page'),
    config = {
        MathJax: {
            tex2jax: {inlineMath: [['$','$'],['\\\\(','\\\\)']]}
        },
        format: 'TeX'
    },
    nodeconfig = {
        mml: true
    };
mjpage.init();
var yourMath = 'This is good enough';
yourMath += '$E = mc^2$';
yourMath += ' and show the path';
yourMath += "$\int_a^b f'(x)=f(b)-f(a)$.";

mjpage.mjpage(yourMath, config, nodeconfig, function(output){
    var mml = output.replace(/\s*<\/?(html|body|head)>\s*/gm, '');
    console.log(mml);
});
