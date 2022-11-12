# How to compute coordinates in a canvas element

First, you need a `map` function to map number between different ranges. The `map` function is defined as follow.

```typescript
function map(x: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
```

Assuming you have a `canvas` element, and you want to compute the coordinates inside the canvas when a mouse click event `e` happens. The formula is:

```javascript
X = Math.floor(map(e.offsetX, 0, canvas.clientWidth, 0, canvas.width));
Y = Math.floor(map(e.offsetY, 0, canvas.clientHeight, 0, canvas.height));
```
    
The `X` and `Y` values are the coordinates inside the canvas.
