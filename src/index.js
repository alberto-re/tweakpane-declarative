import { Pane } from 'tweakpane';

export const SEPARATOR = { name: '__separator__' };

const POINT_DIMENSIONS = ['x', 'y', 'z', 'w'];
const POINT_KEYS_TO_SWAP = ['min', 'max', 'step', 'inverted'];

function addInput(input, parent, components) {
  components[input.name] = input.default;

  // In case the parameter is a 2d/3d/4d point we must rewrite
  // the min/max/step properties from this format (example):
  // { step: { y: 50 }, min: { x: 0, y: 0 } }
  // to this one:
  // { x: { step: 50, min: 0 }, y: { min: 0 } }
  if (
    typeof input.default === 'object'
    && 'x' in input.default
    && 'y' in input.default
  ) {
    if (!('x' in input)) {
      input.x = {};
    }
    if (!('y' in input)) {
      input.y = {};
    }
    POINT_DIMENSIONS.forEach((axis) => {
      POINT_KEYS_TO_SWAP.forEach((key) => {
        if (key in input) {
          if (axis in input[key]) {
            input[axis][key] = input[key][axis];
          }
        }
      });
    });
  }

  const added = parent.addInput(components, input.name, input);
  if ('events' in input && Array.isArray(input.events)) {
    added.on('change', (ev) => {
      input.events.forEach((cb) => {
        cb(ev);
      });
    });
  }
}
function addSeparator(parent) {
  parent.addSeparator();
}

export function declarePane(components, cfg = {}) {
  const pane = new Pane(cfg);

  components.forEach((component) => {
    if ('inputs' in component) {
      const folder = pane.addFolder({
        title: component.title,
        expanded: component.expanded ?? true,
      });
      component.inputs.forEach((input) => {
        addInput(input, folder, components);
      });
    } else if (component.name === SEPARATOR.name) {
      addSeparator(pane);
    } else {
      addInput(component, pane, components);
    }
  });

  return pane;
}
