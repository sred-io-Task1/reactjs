
## Input

```javascript
// @compilationMode(infer)
const Test = () => <div />;

```

## Code

```javascript
import { c as _c } from "react/compiler-runtime"; // @compilationMode(infer)
const Test = () => {
  const $ = _c(1);
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = <div />;
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  return t0;
};

```
      
### Eval output
(kind: exception) Fixture not implemented