/* eslint-disable no-cond-assign */
import {Node} from "./Node";
import {Array} from "@svgdotjs/svg.js";
import util from '../util';

const PEM = 18;
const DEFAULT_HEIGHT = PEM * 2;
const DEFAULT_GAP = PEM;

const DEFAULT_OPTIONS = {
    getId(data: any): string {
        return data.id || data.name;
    },
    getPreH(data: any): number {
        return data.preH || 0;
    },
    getPreV(data: any): number {
        return data.preV || 0;
    },
    getHGap(data: any): number {
        return data.hgap || DEFAULT_GAP;
    },
    getVGap(data: any): number {
        return data.vgap || DEFAULT_GAP;
    },
    getChildren(data: any): any {
        return data.children;
    },
    getHeight(data: any): number {
        return data.height || DEFAULT_HEIGHT;
    },
    getWidth(data: any): number {
        const label = data.label || ' ';
        return data.width || (label.split('').length * PEM); // FIXME DO NOT get width like this
    }
};

// util.assign(Node.prototype, {
//
//
// });

export function hierarchy(data: any, options: any, isolated?: boolean): Node {
    // todo 结构赋值，将data 数据遍历为 node 数组
    options = util.assign({}, DEFAULT_OPTIONS, options);
    const root = new Node(data, options);
    const nodes = [root];
    let node;
    if (!isolated && !data.collapsed) {
        while (node = nodes.pop()) {
            if (!node.data.collapsed) {
                const data_children: Array<any> = node.data.children;
                const length = data_children ? data_children.length : 0;

                const children: Array<Node> = new Array();
                if (data_children && length) {
                    for (let i = 0; i < length; i++) {
                        const child = new Node(data_children[i], options);
                        child.parent = node;
                        child.depth = node.depth + 1;
                        nodes.push(child);

                        children[i] = child;
                    }
                }
                node.children = children;
            }
        }
    }
    return root;
}