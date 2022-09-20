import {Layout} from './layout/Layout';
import {traverse as MindMap} from './layout/mindmap';
import {func as doTreeLayout} from './layout/do-layout';
import util from './util';

class MindMapLayout extends Layout {

    execute() {
        return doTreeLayout(this.rootNode, this.options, MindMap);
    }
}

const DEFAULT_OPTIONS = {};

export function mindMapLayout(root: any, options: any) {
    // todo: 动态拼接操作选项
    options = util.assign({}, DEFAULT_OPTIONS, options);
    return new MindMapLayout(root, options).execute();
}
