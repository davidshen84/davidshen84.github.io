# How to run Jetty as a Windows Service

Thanks the [OP][1] and people discussed about the [issue][4] on stackoverflow.

- Download the *binary* version of [Procrun][2] from [here][3].

- Unpack it and go to the extraction folder, then execute:

>     prunsrv //IS//JettyService
        --Install=C:\path\to\prunsrv.exe
        --Startup=manual
        --StartMode=java
        --Classpath=C:\path\to\jetty\start.jar
        --StartClass=org.eclipse.jetty.start.Main
        ++JvmOptions=-Djetty.home=C:\path\to\jetty\home
        ++JvmOptions=-Dsolr.home=C:\path\to\solr\home
        ++JvmOptions=-DSTOP.PORT=8079
        ++JvmOptions=-DSTOP.KEY=stop
        --StopMode=java
        --StopClass=org.eclipse.jetty.start.Main
        ++StopParams=--stop

- The *STOP.PORT* and *STOP.KEY* is required if you want to use the *--stop* option to stop the Jetty service. This is a Jetty security control measure.

- To delete the service:

      prunsrv.exe //DS/JettyService



  [1]: http://www.visionfactory.com.au/blog/running_jetty_8_1_as_a_windows_service
  [2]: https://commons.apache.org/proper/commons-daemon/index.html
  [3]: https://commons.apache.org/proper/commons-daemon/binaries.html
  [4]: http://stackoverflow.com/questions/7976261/how-to-stop-solr-with-command-line