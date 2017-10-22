(setq org-publish-project-alist
      '(("blog"
         :base-directory "./"
         :base-extension "org"
         :publishing-directory "../"
         :recursive t
         :publishing-function org-html-publish-to-html
         :auto-preamble)

        ("static"
         :base-directory "./js"
         :base-extension "js"
         :publishing-directory "../js"
         :recursive t
         :publishing-function org-publish-attachment)

        ("org" :components ("blog" "static"))))
