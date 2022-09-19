/* eslint-disable no-cond-assign */
import util from '../util';

const PEM = 18;
const DEFAULT_HEIGHT = PEM * 2;
const DEFAULT_GAP = PEM;


const DEFAULT_OPTIONS = {
    getId(d: any) {
        return d.id || d.name;
    },
    getPreH(d: any) {
        return d.preH || 0;
    },
    getPreV(d: any) {
        return d.preV || 0;
    },
    getHGap(d: any) {
        return d.hgap || DEFAULT_GAP;
    },
    getVGap(d: any) {
        return d.vgap || DEFAULT_GAP;
    },
    getChildren(d: any) {
        return d.children;
    },
    getHeight(d: any) {
        return d.height || DEFAULT_HEIGHT;
    },
    getWidth(d: any) {
        const label = d.label || ' ';
        return d.width || (label.split('').length * PEM); // FIXME DO NOT get width like this
    }
};

function Node(this: any, data: any, options: any) {
    const me = this;
    me.vgap = me.hgap = 0;
    if (data instanceof Node) return data;
    me.data = data;
    /*
     * Gaps: filling space between nodes
     * (x, y) ----------------------
     * |            vgap            |
     * |    --------------------    h
     * | h |                    |   e
     * | g |                    |   i
     * | a |                    |   g
     * | p |                    |   h
     * |   ---------------------    t
     * |                            |
     *  -----------width------------
     */
    const hgap = options.getHGap(data);
    const vgap = options.getVGap(data);
    me.preH = options.getPreH(data);
    me.preV = options.getPreV(data);
    me.width = options.getWidth(data);
    me.height = options.getHeight(data);
    me.width += me.preH;
    me.height += me.preV;
    me.id = options.getId(data);
    me.x = me.y = 0;
    me.depth = 0;
    if (!me.children) {
        me.children = [];
    }
    me.addGap(hgap, vgap);
    return me;
}

util.assign(Node.prototype, {
    isRoot(this: any) {
        return (this.depth === 0);
    },

    isLeaf(this: any) {
        return (this.children.length === 0);
    },

    addGap(this: any, hgap: number, vgap: number) {
        const me = this;
        me.hgap += hgap;
        me.vgap += vgap;
        me.width += 2 * hgap;
        me.height += 2 * vgap;
    },

    eachNode(this: any, callback: (...args: any) => void) { // Depth First traverse
        const me = this;
        let nodes = [me];
        let current;
        while (current = nodes.shift()) {
            callback(current);
            nodes = current.children.concat(nodes);
        }
    },

    DFTraverse(this: any, callback: () => void) { // Depth First traverse
        this.eachNode(callback);
    },

    BFTraverse(this: any, callback: (...args: any) => void) { // Breadth First traverse
        const me = this;
        let nodes = [me];
        let current;
        while (current = nodes.shift()) {
            callback(current);
            nodes = nodes.concat(current.children);
        }
    },

    getBoundingBox() {
        // BBox for just one tree node
        const bb = {
            left: Number.MAX_VALUE,
            top: Number.MAX_VALUE,
            width: 0,
            height: 0
        };
        this.eachNode(node => {
            bb.left = Math.min(bb.left, node.x);
            bb.top = Math.min(bb.top, node.y);
            bb.width = Math.max(bb.width, node.x + node.width);
            bb.height = Math.max(bb.height, node.y + node.height);
        });
        return bb;
    },

    // translate
    translate(tx = 0, ty = 0) {
        this.eachNode(node => {
            node.x += tx;
            node.y += ty;
            node.x += node.preH;
            node.y += node.preV;
        });
    },

    right2left() {
        const me = this;
        const bb = me.getBoundingBox();
        me.eachNode(node => {
            node.x = node.x - (node.x - bb.left) * 2 - node.width;
            // node.x = - node.x;
        });
        me.translate(bb.width, 0);
    },

    bottom2top() {
        const me = this;
        const bb = me.getBoundingBox();
        me.eachNode(node => {
            node.y = node.y - (node.y - bb.top) * 2 - node.height;
            // node.y = - node.y;
        });
        me.translate(0, bb.height);
    }
});

export function hierarchy(data: any, options: any, isolated?: boolean) {
    options = util.assign({}, DEFAULT_OPTIONS, options);
    const root = Node(data, options);
    const nodes = [root];
    let node;
    if (!isolated && !data.collapsed) {
        while (node = nodes.shift()) {
            if (!node.data.collapsed) {
                const children = options.getChildren(node.data);
                const length = children ? children.length : 0;
                node.children = new Array(length);
                if (children && length) {
                    for (let i = 0; i < length; i++) {
                        const child = Node(children[i], options);
                        node.children[i] = child;
                        nodes.push(child);
                        child.parent = node;
                        child.depth = node.depth + 1;
                    }
                }
            }
        }
    }
    return root;
}
