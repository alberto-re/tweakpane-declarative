# tweakpane-declarative

A declarative interface for [Tweakpane](https://github.com/cocopon/tweakpane).

## Quick start

First, run `npm install tweakpane-declarative` for your app. Then, in your code:

```js
import declarePane from 'tweakpane-declarative';

...
const PARAMS = [
    { name: 'checkbox', default: false },
    { name: 'quantity', min: 0, max: 100, step: 10,  default: 20 },
    { name: 'debug', label: 'Debug on/off', default: false },
];

pane = declarePane(PARAMS);
```

## License

MIT License. See `LICENSE.txt` for more information.
