var exec;
var active;

$(document).ready(function(){
    window.resizeTo(350, window.screen.availHeight);
    window.moveTo(window.screen.availWidth - 350, 0);
    exec("ls ~/.config/xnm", function(error, stdout, stderr) {
        if(!stdout.includes("blank.xoj")) {
            exec("mkdir -p ~/.config/xnm && cp blank.xoj ~/.config/xnm/blank.xoj");
        }
    });
    exec("ls ~/.xnm", function(error, stdout, stderr) {
        if(stderr == "") {
            getBooks();
        } else {
            exec("mkdir -p ~/.xnm/Default", function(error, stdout, stderr) {
                getBooks();
            });
        }
    });
});