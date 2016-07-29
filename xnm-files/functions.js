$(document).ready(function(){
    modernAlert({
        titleBackgroundColor : "#2e7e79"
    });
    exec = require('child_process').exec;
});

function addBook() {
    window.prompt("Book name:", "Book Name", function(name) {
        name = strip(name);
        exec("mkdir ~/.xnm/" + name, function(error, stdout, stderr) {
            if(stderr != "") {
                alert(stderr);
                alertFocus();
            }
        });
        getBooks();
    });
    promptFocus();
}
function getBooks() {
    active = undefined;
    getNotes();
    $("#books").empty();
    exec("ls ~/.xnm", function(error, stdout, stderr) {
        var books = stdout.split("\n");
        books.splice(books.length - 1, 1);
        if(books[0] == undefined) {
            $("#books").append("<p class='text'>No notebooks</p>")
        } else {
            books.forEach(function(element) {
                $("#books").append("<button class='book' id='book-" + element + "' onclick=\"openBook('" + element + "')\">" + element + "</button>");
                $("#books").append("<button class='delete' onclick=\"removeBook('" + element + "')\">-</button>");
            });
        }
    });
}
function removeBook(book) {
    confirm("Are you sure you want to delete the " + book + " notebook? This will permanently delete all of the notes it contains.", "Confirm Delete", function(boo) {
        if(!boo) {
            return 0;
        }
        exec("rm -R ~/.xnm/" + book, function(error, stdout, stderr) {
            if(stderr != "") {
                alert(stderr);
                alertFocus();
            }
        });
        getBooks();
    });
    alertFocus();
}
function openBook(book) {
    $(":disabled").prop("disabled", false);
    $("#book-" + book).prop("disabled", true);
    active = book;
    getNotes();
}

function addNote() {
    if(active == undefined) {
        alert("Select a notebook first.");
        alertFocus();
        return 1;
    }
    window.prompt("Note name:", "Note Name", function(name) {
        name = strip(name);
        var path = "~/.xnm/" + active + "/" + name + ".xoj";
        exec("ls " + path, function(error, stdout, stderr) {
            if(stdout == "") {
                exec("cp ~/.config/xnm/blank.xoj " + path, function(error, stdout, stderr) {
                    if(stderr != "") {
                        alert(stderr);
                        alertFocus();
                    }
                    getNotes();
                    openNote(name);
                });
            } else {
                alert("A note with the name " + name + " already exists in this notebook.");
                alertFocus();
            }
        });
    });
    promptFocus();
}
function impert() {
    if(active == undefined) {
        alert("Select a notebook first.");
        alertFocus();
        return 1;
    }
    window.prompt("Path:", "Path", function(path) {
        var array = path.split("/");
        var name = strip(array[array.length - 1]);
        var ext = name.substring(name.length - 4, name.length)
        name = name.substring(0, name.length - 4);
        try {
            fs.accessSync("~/.xnm/" + active + "/" + name + ".xoj", fs.F_OK);
            alert("A note with this name already exists");
            alertFocus();
            return 2;
        } catch (e) {}
        exec("ls ~/.xnm" + active + "/" + name + ".xoj", function(error, stdout, stderr) {
            if(stdout == "") {
                var cmd = "cp " + path + " ~/.xnm/" + active + "/" + name;
                if(ext == ".xoj") {
                    cmd += ".xoj";
                }
                exec(cmd, function(error, stdout, stderr) {
                    if(stderr != "") {
                        alert(stderr);
                        alertFocus();
                    }
                    if(ext != ".xoj") {
                        cmd = "xournal ~/.xnm/" + active + "/" + name + " & sleep 0.5 && xdotool windowfocus $(xdotool search --pid $(ps ux | grep \"xournal $(echo ~)/.xnm/" + active + "/" + name + "\" | awk -v RS=[0-9]+ '{print RT+0;exit}') | sed '2q;d') && xdotool key ctrl+s && xdotool key KP_Enter && rm ~/.xnm/" + active + "/" + name;
                        exec(cmd, function() {
                            getNotes();
                        });
                    } else {
                        getNotes();
                        openNote(name);
                    }
                });
            } else {
                alert("A note with the name " + name + " already exists in this notebook.");
                alertFocus();
            }
        });
    });
    promptFocus();
}
function getNotes() {
    $("#notes").empty();
    if(active == undefined) {
        $("#notes").append("<p class='text'>Select a notebook</p>");
        return 0;
    }
    exec("ls -t ~/.xnm/" + active, function(error, stdout, stderr) {
        var notes = stdout.split("\n");
        notes.splice(notes.length - 1, 1);
        if(notes[0] == undefined) {
            $("#notes").append("<p class='text'>Empty notebook</p>")
        } else {
            notes.forEach(function(element) {
                element = element.substring(0, element.length - 4);
                $("#notes").append("<button class='note' onclick=\"openNote('" + element + "')\">" + element + "</button>");
                $("#notes").append("<button class='delete' onclick=\"removeNote('" + element + "')\">-</button>");
            });
        }
    });
}
function openNote(name) {
    exec("xournal ~/.xnm/" + active + "/" + name + ".xoj");
}
function removeNote(name) {
    confirm("Are you sure you want to delete the " + name + " note from the " + active + " notebook? This cannot be undone.", "Confirm Delete", function(boo) {
        if(!boo) {
            return 0;
        }
        exec("rm ~/.xnm/" + active + "/" + name + ".xoj", function(error, stdout, stderr) {
            if(stderr != "") {
                alert(stderr);
                alertFocus();
            }
        });
        getNotes();
    });
    alertFocus();
}

function editTemplate() {
    exec("xournal ~/.config/xnm/blank.xoj")
}
function resetTemplate() {
    exec("cp blank.xoj ~/.config/xnm/blank.xoj");
}

function promptFocus() {
    $(".modernAlertWrapper input[type='text']").focus();
    $(".modernAlertWrapper input[type='text']").keyup(function(event){
        if(event.keyCode == 13){
            $(".modernAlertWrapper input[value='Ok']").click();
        }
    });
}
function alertFocus() {
    $(".modernAlertWrapper input[value='Ok']").focus();
}

function strip(text) {
    return text.replace(/[^a-zA-Z0-9._]+/g, '');
}