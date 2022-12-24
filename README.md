![CI](https://github.com/alberto-re/tweakpane-declarative/actions/workflows/ci.yaml/badge.svg)

# tweakpane-declarative

A declarative interface for [Tweakpane](https://github.com/cocopon/tweakpane).

# Quick start

First, run `npm install tweakpane-declarative` for your app. Then, in your code:

```js
import { declarePane } from 'tweakpane-declarative';

...
const PARAMS = [
    { button: 'reset', events: [ resetCallback ] },
    { input: 'checkbox', default: false },
    { input: 'quantity', min: 0, max: 100, step: 10,  default: 20 },
    { input: 'point2d', default: { x: 50, y: 25 }, picker: 'inline', expanded: true },
    { input: 'debug', label: 'Debug on/off', default: false },
    { input: 'theme', label: 'Theme', default: 'light', options: { Dark: 'dark', Light: 'light' } },
];

pane = declarePane(PARAMS);
```

## Change events

To declare change events (callbacks) for an input use the _events_ attribute, which must be an array of one or more functions:

```js
const myCallback = function(ev) {
	console.log(`change: ${ev.value}`);
}

const PARAMS = [
	{ input: 'debug', default: false, events: [ myCallback ]},
];
```

## Add a separator between components

Add the SEPARATOR object in the desired position after importing it in the module namespace:

```js
import { declarePane, SEPARATOR } from 'tweakpane-declarative';

const PARAMS = [
    { input: 'checkbox', default: false },
    SEPARATOR,
    { input: 'debug', label: 'Debug on/off', default: false },
];
```

## License

MIT License. See `LICENSE.txt` for more information.

## Authors

- Roberto Pesando <roberto.pesando@gmail.com>
- Alberto Re <alberto.re@gmail.com>
