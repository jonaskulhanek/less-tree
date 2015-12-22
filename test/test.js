'use strict';

require('should');
const tree = require('../index');
const path = require('path');
const CWD = process.cwd();

describe('less-tree', () => {
  before(() => process.chdir(path.join(__dirname, 'source')));
  after(() => process.chdir(CWD));
  it('should to tree object', () => {
    tree(path.join(process.cwd(), 'a.less')).toTreeObject().should.be.eql({
      'b.less': {
        'd.less': {
          'sub/f.less': {}
        }
      },
      'c.less': {
        'd.less': {
          'sub/f.less': {}
        }
      },
      'sub/e.less': {}
    });
  });
  it('should to tree string', () => {
    tree(path.join(process.cwd(), 'a.less')).toTreeString().trim().should.be.eql(`
├─ b.less
│  └─ d.less
│     └─ sub/f.less
├─ c.less
│  └─ d.less
│     └─ sub/f.less
└─ sub/e.less
   `.trim());
  });
});
