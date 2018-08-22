function update(){
    var text = document.getElementById('editor');
    var oldText = text.value;
    var preview = document.getElementById('preview');
    var timeout = null;

    function handleChange(){
        var newText=text.value;
        if (newText === oldText) {
            return;
        } else {
            oldText=newText;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(newText);
        xhr.onreadystatechange = processRequest;
        function processRequest(){
            if (xhr.readyState === 4 && xhr.status === 200 ){
                var req = xhr.responseText;
                preview.innerHTML = req;
            }
        }
    }

    function handle(){
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout=setTimeout(handleChange, 50);
    }

    text.onkeydown=text.onkeyup=text.onclick=handle;
}

update();
document.getElementById('editor').focus();
