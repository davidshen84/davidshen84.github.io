# Javascript curry function

    function currify(obj, func) {
      var slice = Array.prototype.slice,
        funcArgLength,
        curry;

      // guess the correct argument types
      if (typeof(obj) === 'function') {
        func = obj;
        obj = null;
      }
      funcArgLength = func.length;

      curry = function () {
        // save the arguments into an array
        var args = slice.apply(arguments);

        if (args.length >= funcArgLength) {
          return func.apply(obj, args);
        } else {
          return function () {
            return curry.apply(null, args.concat(slice.apply(arguments)));
          };
        }
      };

      return curry;
    }

Example:
========

    function add(a, b) {
      return a + b;
    }

    var newadd = currify(add),
      add1 = newadd(1),
      result = add1(1); // result = 2

Problem:
========

If *func* relies on variable number of parameters, it is **not** gonna work :(