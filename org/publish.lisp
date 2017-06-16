(setq org-publish-project-alist
      '(
        ("blog"
         :base-directory "./"
         :base-extension "org"
         :publishing-directory "../"
         :recursive t
         :publishing-function org-html-publish-to-html
         :auto-preamble)

        ("org" :components ("blog"))
        ))
