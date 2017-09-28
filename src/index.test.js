import { expect } from 'chai';
import fs from 'fs';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

describe('Our first test', () => {
  it('should pass', () => {
    expect(true).to.equal(true);
  });
});

describe('index.html', () => {
  it('should have h1 that says Users', () => {
    const index = fs.readFileSync('./src/index.html', 'utf-8');
    const dom = new JSDOM(index);
    const h1 = dom.window.document.querySelector('h1').textContent;
    expect(h1).to.equal('Users');
  });
});
