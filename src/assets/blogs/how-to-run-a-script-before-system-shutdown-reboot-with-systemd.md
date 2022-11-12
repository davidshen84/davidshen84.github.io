# How to run a script before system shutdown/reboot with Systemd

- Create a file named *reboot-task.service* at */usr/local/lib/systemd/system*

      [Unit]
      Description=Switch on the discrete graphic card before reboot
      DefaultDependencies=no
      Before=reboot.target

      [Service]
      Type=oneshot
      ExecStart=/path/to/script args

      [Install]
      WantedBy=reboot.target

- Then run with root:

  > systemctl enable reboot-task

**ALL DONE!** :)