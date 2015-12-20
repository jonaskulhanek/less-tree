'use strict';

const fs = require('fs-extra');
const File = require('vinyl');
const parseDep = require('./parseDep');
const stringify = require('./stringify');
let cache = {};

const createFileTree = filePath => {
  if (!cache[filePath]) {
    let file = new File({
      path: filePath,
      contents: fs.readFileSync(filePath)
    });
    file.children = parseDep(file).map(createFileTree);
    file.toTreeString = () => stringify(file);
    cache[filePath] = file;
  }
  return cache[filePath];
};

module.exports = createFileTree;
