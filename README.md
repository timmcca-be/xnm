# XNM
Xournal Note Manager - Simple OneNote-like note management for Xournal

This program provides a basic GUI for creating and opening notebooks and notes for Xournal. It depends on Xournal, NW.js, xdotool, and jQuery (installed to "/usr/share/javascript/jquery/jquery.min.js" - this is the default for the "jquery" package in the Arch User Repository and on many other Linux platforms). It automatically incorporates modernAlert as a submodule.

This software is written for and exclusively tested on Linux at the moment. To install, run install.sh as root. To run after installing, run xnm from the command line. Notebooks are stored in the left column, notes in the right. Clicking a notebook will display all of the notes in it, and clicking a note will open it in Xournal. My preferred setup is to put the XNM window on the far right of the screen so that when Xournal opens up, you will be able to see both its window and the XNM window side by side.