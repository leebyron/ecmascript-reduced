# Short-circuiting Array.prototype.reduce()

**Stage:** 0, Strawman

**Author:** Lee Byron

Short-circuiting from a `reduce` operation allows it to be more generically
useful. Much of the clojure core library is built on this premise.

```js
// Reduce a sum or "99+"
values.reduce(function (a, v) {
  if (a + v < 100) {
    return a + v;
  } else {
    return { [Symbol.reduced]: "99+" };
  }
});
```

This proposal suggests adding a new well known symbol *@@reduced* and altering
the defintion of **Array.prototype.reduce** to respect this symbol.


# Additions to Spec

## 6.1.5.1  Well-Known Symbols
> One row is added to Table 1.

| Specification Name | [[Description]] | Value and Purpose |
| ------------------ | --------------- | ----------------- |
| @@reduced  | "Symbol.reduced" | A property detected in the return value of a *reduce* function to indicate early completion. |


## 19.4.2  Properties of the Symbol Constructor

### 19.4.2.X  Symbol.reduced
> This property is new

The initial value of Symbol.reduced is the well known symbol @@reduced (Table 1).

This property has the attributes { [[Writable]]: **false**, [[Enumerable]]: **false**, [[Configurable]]: **false** }



## 22.1.3  Properties of the Array Prototype Object

### 22.1.3.18  Array.prototype.reduce ( *callbackfn [ , initialValue ] )
> This existing method has some additions: 10.d.v - 10.d.vii

  1. Let *O* be ToObject(this value).
  2. ReturnIfAbrupt(*O*).
  3. Let *len* be ToLength(Get(*O*, "length")).
  4. ReturnIfAbrupt(*len*).
  5. If IsCallable(*callbackfn*) is **false**, throw a **TypeError** exception.
  6. If *len* is 0 and *initialValue* is not present, throw a **TypeError** exception.
  7. Let *k* be 0.
  8. If *initialValue* is present, then
      * a. Set *accumulator* to *initialValue*.
  9. Else *initialValue* is not present,
      * a. Let *kPresent* be **false**.
      * b. Repeat, while *kPresent* is **false** and *k* < *len*
          * i. Let *Pk* be ToString(*k*).
          * ii. Let *kPresent* be HasProperty(*O*, *Pk*).
          * iii. ReturnIfAbrupt(*kPresent*).
          * iv. If *kPresent* is **true**, then
              1. Let *accumulator* be Get(*O*, *Pk*).
              2. ReturnIfAbrupt(*accumulator*).
          * v. Increase *k* by 1.
      * c. If *kPresent* is **false**, throw a **TypeError** exception.
  10. Repeat, while *k* < *len*
      * a. Let *Pk* be ToString(*k*).
      * b. Let *kPresent* be HasProperty(*O*, *Pk*).
      * c. ReturnIfAbrupt(*kPresent*).
      * d. If *kPresent* is **true**, then
          * i. Let *kValue* be Get(*O*, *Pk*).
          * ii. ReturnIfAbrupt(*kValue*).
          * iii. Let *accumulator* be Call(*callbackfn*, **undefined**, «*accumulator*, *kValue*, *k*, O»).
          * iv. ReturnIfAbrupt(*accumulator*).
          * v. <ins>Let *A* be ToObject(*accumulator*).</ins>
          * vi. <ins>Let *reducedPresent* be HasProperty(*A*, @@reduced).</ins>
          * vii. <ins>If *reducedPresent* is **true**, then</ins>
              1. <ins>Let *reduced* be Get(A, @@reduced).</ins>
              2. <ins>ReturnIfAbrupt(*reduced*).</ins>
              3. <ins>Return *reduced*.</ins>
      * e. Increase *k* by 1.
  11. Return *accumulator*.
