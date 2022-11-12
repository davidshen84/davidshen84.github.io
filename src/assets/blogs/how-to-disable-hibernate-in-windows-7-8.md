# How to disable Hibernate in Windows 7/8

I cannot believe this useless function is enabled by default in today's laptop...But here's how to fix this problem.

- Open an Elevated command prompt
- Input: `powercfg -h off`, and press **Enter**
- Goto root of your Windows installation drive, usually `C:\` and delete the **Hiberfil.sys** file. *It is a hidden system file.*

Congratulations! :)