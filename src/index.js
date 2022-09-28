import { Pane } from 'tweakpane';

function declarePane(components, cfg = {}) {
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
        } else {
            addInput(component, pane, components);
        }
    });

    return pane;
}

function addInput(input, parent, components) {
    components[input.name] = input.default;
    parent.addInput(components, input.name, input);
}

module.exports = declarePane;
