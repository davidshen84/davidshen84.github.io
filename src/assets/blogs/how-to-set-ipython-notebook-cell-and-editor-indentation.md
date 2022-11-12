# How to set IPython Notebook cell and editor indentation

Find `~/.ipython/profile_default/static/custom/custom.js` file. *The path may vary depending on your platform.*

Add the following code to the file:

```javascript
define([
  'base/js/namespace',
  'base/js/events'
], function(IPython, events) {
  events.on("app_initialized.NotebookApp", function () {
    // this line set the indent unit in the notebook cell
    IPython.Cell.options_default.cm_config.indentUnit = 2;
  });
});
```

If you want to change the default indent unit in the code mirror editor, you can execute the following line in a console on the editor page:

```javascript
IPython.editor.config.update({Editor:{codemirror_options:{indentUnit:2}}})
```

Please refer to issue [#8808](https://github.com/ipython/ipython/issues/8808#issuecomment-139811171).