import {hierarchy} from './hierarchy';
import {Node} from "./Node";

export class Layout {
    protected options: any;
    protected rootNode: Node;

    constructor(root: any, options: any) {
        this.options = options;
        // todo 构造节点树
        this.rootNode = hierarchy(root, options);
    }


    execute() {
        throw new Error('please override this method');
    }
}
