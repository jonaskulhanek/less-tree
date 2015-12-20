'use strict';

const treeify = require('treeify');
const path = require('path');
const toTree = (file, root) => {
  let rst = {};
  file.children.forEach(child => rst[path.relative(path.dirname(root.path), child.path)] = toTree(child, root));
  return rst;
};
module.exports = file => treeify.asTree(toTree(file, file), true);
