# How to get a bash terminal in Android Studio on Windows

Well, of course it is impossible to get a real bash terminal on Windows. By *bash*, I actually mean the **cygwin** bash. And of course, you can change to other shells as well, as long as cygwin supports.

- Install **cygwin** and the shell you like.
- Setup **Android Studio**, and to go the *Terminal* settings
    - `Ctrl` + `Alt` + `S`, then search for *Terminal* **:)**
- In the *Shell path* field, put:
   - `C:\cygwin64\bin\bash -c "/bin/xhere /bin/zsh.exe '%V'"`
   - Adjust the path to your settings.
   - Here you can see I am actually using the great **zsh**.
- Save the settings and give a try.

Note: That command line is copied from **chere**, a cygwin package to help you setup a `Terminal Here` like context menu on Windows.