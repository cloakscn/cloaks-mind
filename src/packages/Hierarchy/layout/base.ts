import {hierarchy} from './hierarchy';

export class Layout {
    protected options: any;
    protected rootNode: any;
    constructor(root: any, options: any) {
        this.options = options;
        this.rootNode = hierarchy(root, options);
    }

    execute() {
        throw new Error('please override this method');
    }
}
