import {Layout as TreeLayout} from './layout/base';
import {traverse as MindMap} from './layout/mindmap';
import {func as doTreeLayout} from './layout/do-layout';
import util from './util';

class MindMapLayout extends TreeLayout {
    execute() {
        return doTreeLayout(super.rootNode, super.options, MindMap);
    }
}

const DEFAULT_OPTIONS = {};

export default function mindMapLayout(root:any, options:any) {
    options = util.assign({}, DEFAULT_OPTIONS, options);
    return new MindMapLayout(root, options).execute();
}

