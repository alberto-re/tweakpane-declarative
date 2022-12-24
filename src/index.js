import { Pane } from 'tweakpane';

export const SEPARATOR = { separator: true };

const POINT_DIMENSIONS = ['x', 'y', 'z', 'w'];
const POINT_KEYS_TO_SWAP = ['min', 'max', 'step', 'inverted'];

function addInput(element, parent, components) {
  components[element.input] = element.default;

  // In case the element is a 2d/3d/4d point we must rewrite
  // the min/max/step properties from this format (example):
  // { step: { y: 50 }, min: { x: 0, y: 0 } }
  // to this one:
  // { x: { step: 50, min: 0 }, y: { min: 0 } }
  if (
    typeof element.default === 'object'
    && 'x' in element.default
    && 'y' in element.default
  ) {
    if (!('x' in element)) {
      element.x = {};
    }
    if (!('y' in element)) {
      element.y = {};
    }
    POINT_DIMENSIONS.forEach((axis) => {
      POINT_KEYS_TO_SWAP.forEach((key) => {
        if (key in element) {
          if (axis in element[key]) {
            element[axis][key] = element[key][axis];
          }
        }
      });
    });
  }

  const added = parent.addInput(components, element.input, element);
  if ('events' in element && Array.isArray(element.events)) {
    added.on('change', (ev) => {
      element.events.forEach((cb) => {
        cb(ev);
      });
    });
  }
}

function addSeparator(parent) {
  parent.addSeparator();
}

function addButton(element, parent) {
  const added = parent.addButton({ title: element.button });
  if ('events' in element && Array.isArray(element.events)) {
    added.on('click', (ev) => {
      element.events.forEach((cb) => {
        cb(ev);
      });
    });
  }
}

export function declarePane(components, cfg = {}) {
  const pane = new Pane(cfg);

  components.forEach((component) => {
    if ('separator' in component) {
      addSeparator(pane);
    } else if ('input' in component) {
      addInput(component, pane, components);
    } else if ('button' in component) {
      addButton(component, pane);
    } else {
      throw new Error('Invalid component');
    }
  });

  return pane;
}
