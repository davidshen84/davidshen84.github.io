# How to compute coordinates in a canvas element

Assuming you have a `canvas` element, and you want to compute the coordinates inside the canvas when a mouse click event `e` happens. The formula is:

```javascript
X = Math.floor(e.offsetX / canvas.clientWidth * canvas.width);
Y = Math.floor(e.offsetY / canvas.clientHeight * canvas.height);
```
    
The `X` and `Y` values are the coordinates inside the canvas.
