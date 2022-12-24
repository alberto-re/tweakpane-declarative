import chai from 'chai';
import { describe, it } from 'mocha';

import { JSDOM } from 'jsdom';
import { declarePane, SEPARATOR } from '../src/index.js';

const dom = new JSDOM('', { url: 'https://example.org/' });
global.document = dom.window.document;
global.window = dom.window;

describe('declarePane()', () => {
  describe('when providing no parameters', () => {
    it('should return an empty panel, expanded and enabled', () => {
      const PARAMS = [];
      const pane = declarePane(PARAMS);
      chai.expect(pane).to.not.equal(null);
      chai.expect(pane.expanded).to.equal(true);
      chai.expect(pane.disabled).to.equal(false);
    });
  });
  describe('when providing a simple boolean parameter', () => {
    it('should return a panel with one input binding as child', () => {
      const PARAMS = [{ input: 'toggle', default: true }];
      const pane = declarePane(PARAMS);
      chai.expect(pane.children.length).to.equal(1);
      chai.expect(pane.children[0].label).to.equal('toggle');
    });
  });
  describe('when providing a simple 2d point parameter', () => {
    it('should return a panel with one input binding as child', () => {
      const PARAMS = [{ input: 'point2d', default: { x: 250, y: -100 } }];
      const pane = declarePane(PARAMS);
      chai.expect(pane.children.length).to.equal(1);
      chai.expect(pane.children[0].label).to.equal('point2d');
    });
  });
  describe('when providing the label attribute for an input', () => {
    it('should return a panel with the input binding correctly labeled', () => {
      const PARAMS = [
        { input: 'toggle', label: 'Toggle on/off', default: true },
      ];
      const pane = declarePane(PARAMS);
      chai.expect(pane.children[0].label).to.equal('Toggle on/off');
    });
  });
  describe('when providing the default attribute for an input', () => {
    it('should return a panel with the input binding value set as the provided default', () => {
      const PARAMS = [
        {
          input: 'theme',
          label: 'Theme',
          default: 'light',
          options: { Dark: 'dark', Light: 'light' },
        },
      ];
      const pane = declarePane(PARAMS);
      chai
        .expect(
          pane.children[0].element.getElementsByTagName('select')[0].value,
        )
        .to.equal('light');
    });
  });
  describe('when adding a separator element', () => {
    it('should return a panel with a separator in the correct position', () => {
      const PARAMS = [
        { input: 'first', default: true },
        SEPARATOR,
        { input: 'second', default: true },
      ];
      const pane = declarePane(PARAMS);
      chai.expect(pane.children.length).to.equal(3);
      chai
        .expect(pane.children[1].element.innerHTML)
        .to.equal('<hr class="tp-sprv_r">');
    });
  });
  describe('when providing a simple button parameter', () => {
    it('should return a panel with one button binding as child', () => {
      const PARAMS = [{ button: 'reset' }];
      const pane = declarePane(PARAMS);
      chai.expect(pane.children.length).to.equal(1);
      chai
        .expect(pane.children[0].element.getElementsByTagName('button')[0].innerHTML)
        .to.equal('<div class="tp-btnv_t">reset</div>');
    });
  });
});
