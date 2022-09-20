const TreeLayout = require('./layout/base');
import mindmap from './layout/mindmap';
const doTreeLayout = require('./layout/do-layout');
const util = require('./util');

class MindmapLayout extends TreeLayout {
  execute() {
    const me = this;
    return doTreeLayout(me.rootNode, me.options, mindmap);
  }
}

const DEFAULT_OPTIONS = {
};

function mindmap(root, options) {
  options = util.assign({}, DEFAULT_OPTIONS, options);
  return new MindmapLayout(root, options).execute();
}

export default mindmap;
