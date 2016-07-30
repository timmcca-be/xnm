#!/bin/bash
wind=""
while [ "$wind" = "" ]; do
    wind="$(xdotool search --pid $(ps ux | grep "xournal $(echo ~)/.xnm/$1/$2" | awk -v RS=[0-9]+ '{print RT+0;exit}') | sed '2q;d')"
done
xdotool windowfocus $wind &&
xdotool key ctrl+s &&
xdotool key KP_Enter &&
wind=""
while [ "$wind" = "" ]; do
    wind="$(xdotool search --name "Xournal - $2.xoj")"
done