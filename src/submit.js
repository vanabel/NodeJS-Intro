function set(el, text){
    while (el.firstChild) {
el.removeChild(el.firstChild);
}
    el.appendChild(document.createTextNode(text));
}
function update(){
    var text = document.getElementById('editor');
    var oldText = text.value;
    var preview = document.getElementById('preview');
    var timeout = null;
    /* 50ms delay of handle */
    function handle(){
        var newText = text.value;
        if (newText===oldText){
            return;
        } else {
            oldText=newText;
        }
        set(preview, newText);
    }
    function active(){
        if (timeout){
            clearTimeout(timeout);
        }
        timeout=setTimeout(handle,50);
    }
    text.onkeydown = text.onkeyup = text.onclick =active();
}
update();
document.getElementById('editor').focus();
