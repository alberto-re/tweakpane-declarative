import { Pane } from 'tweakpane';

export const SEPARATOR = { name: '__separator__' };

function addInput(input, parent, components) {
  components[input.name] = input.default;
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
