# How to avoid executing the same method in Linq

Image you have a set of data, which you need to pass them to a web service and build an new object based on the return values.

```cs
var orgData = ...;
var newData = from d from orgData
              select new NewData {
                Value1 = SameMethod(d).Value1,
                Value2 = SameMethod(d).Value2,
                ...
              };

```


If you do this, the *SameMethod* will be called multiple times on the same data value, which is not good. Now you can do this:

```cs
var orgData = ...;
var newData = from d from orgData
              let sameData = SameMethod(d)
              select new NewData {
                Value1 = sameData .Value1,
                Value2 = sameData .Value2,
                ...
              };
```


This time the *SameMethod* is called only once for a given data, and the return value is used multiple times. :)
