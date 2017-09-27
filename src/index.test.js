import { expect } from 'chai';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
import fs from 'fs';

describe('Our first test', () => {
  it('should pass', () => {
    expect(true).to.equal(true);
  });
});

describe('index.html', () => {
  it('should say hello', () => {
    const index = fs.readFileSync('./src/index.html', 'utf-8');
    const dom = new JSDOM(index);
    const h1 = dom.window.document.querySelector('h1').textContent;
    expect(h1).to.equal('Hello World');
  });
});
