#!/bin/bash
err=0
if [ -e /usr/share/javascript/jquery/jquery.min.js ]
then
    echo "jQuery library is in place"
else
    err=1
    >&2 echo "Error: jQuery library is not in place. Install it to /usr/share/javascript/jquery/jquery.min.js before proceeding."
fi

path="$(command -v nw)"
if [ "$path" != "" ]
then
    echo "NW.js is installed"
else
    err=1
    >&2 echo "Error: NW.js is not installed. Install it before proceeding."
fi

path="$(command -v xdotool)"
if [ "$path" != "" ]
then
    echo "xdotool is installed"
else
    err=1
    >&2 echo "Error: xdotool is not installed. Install it before proceeding."
fi

path="$(command -v xournal)"
if [ "$path" != "" ]
then
    echo "Xournal is installed"
else
    err=1
    >&2 echo "Error: Xournal is not installed. Install it before proceeding."
fi

if [ $err = 1 ]
then
    exit
fi

echo "Path for installation (/usr/local/bin):"
read path
if [ "$path" = "" ]
then
    path="/usr/local/bin"
fi

cp -r xnm-files "$path/"
cp modernAlert/modernAlert.min.js "$path/xnm-files"

echo "#!/bin/bash" > "$path/xnm"
echo "nw '$path/xnm-files'" >> "$path/xnm"
chmod a+x "$path/xnm"
chmod a+x "$path/xnm-files/import-bash.sh"

desktop=~/.local/share/applications/xnm.desktop
if [ "$(whoami)" = "root" ]
then
    desktop=/usr/share/applications/xnm.desktop
fi

cp xnm.desktop $desktop

echo "To uninstall this program, run:"
echo "rm -r $desktop $path/xnm $path/xnm-files"