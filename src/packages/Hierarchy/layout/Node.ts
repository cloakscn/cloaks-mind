import {Array} from "@svgdotjs/svg.js";

export class Node {
    public id: any;
    readonly data: any;
    public parent: any;
    public depth!: number;
    public children!: Array<Node>;

    public x!: number;
    public y!: number;
    public vgap: number;
    public hgap: number;
    public width: any;
    public height: any;

    public preH: any;
    public preV: any;
    public side!: string;

    constructor(data: any, options: any) {
        this.vgap = this.hgap = 0;
        if (data instanceof Node) return data;
        this.data = data;
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
        this.preH = options.getPreH(data);
        this.preV = options.getPreV(data);
        this.width = options.getWidth(data);
        this.height = options.getHeight(data);
        this.width += this.preH;
        this.height += this.preV;
        this.id = options.getId(data);
        this.x = this.y = 0;
        this.depth = 0;
        if (!this.children) {
            this.children = new Array();
        }
        this.addGap(hgap, vgap);
    }

    isRoot(): boolean {
        return (this.depth === 0);
    }

    isLeaf(): boolean {
        return (this.children.length === 0);
    }

    addGap(hgap: number, vgap: number): void {
        this.hgap += hgap;
        this.vgap += vgap;
        this.width += 2 * hgap;
        this.height += 2 * vgap;
    }

    eachNode(callback: (...args: any) => void): void { // Depth First traverse
        let nodes: Node[] = [this];
        let current;
        while (current = nodes.shift()) {
            callback(current);
            nodes = current.children.concat(nodes);
        }
    }

    DFTraverse(callback: () => void): void { // Depth First traverse
        this.eachNode(callback);
    }

    BFTraverse(callback: (...args: any) => void): void { // Breadth First traverse
        let nodes: Node[] = [this];
        let current;
        while (current = nodes.shift()) {
            callback(current);
            nodes = nodes.concat(current.children);
        }
    }

    getBoundingBox(): any {
        // BBox for just one tree node
        const bb: any = {
            left: Number.MAX_VALUE,
            top: Number.MAX_VALUE,
            width: 0,
            height: 0
        };
        this.eachNode((node: any) => {
            bb.left = Math.min(bb.left, node.x);
            bb.top = Math.min(bb.top, node.y);
            bb.width = Math.max(bb.width, node.x + node.width);
            bb.height = Math.max(bb.height, node.y + node.height);
        });
        return bb;
    }

    // translate
    translate(tx = 0, ty = 0): void {
        this.eachNode((node: any) => {
            node.x += tx;
            node.y += ty;
            node.x += node.preH;
            node.y += node.preV;
        });
    }

    right2left(): void {
        const bb = this.getBoundingBox();
        this.eachNode((node: any) => {
            node.x = node.x - (node.x - bb.left) * 2 - node.width;
            // node.x = - node.x;
        });
        this.translate(bb.width, 0);
    }

    bottom2top() {
        const bb = this.getBoundingBox();
        this.eachNode((node: any) => {
            node.y = node.y - (node.y - bb.top) * 2 - node.height;
            // node.y = - node.y;
        });
        this.translate(0, bb.height);
    }
}

const a = new Array();
const b = a;
const c = b;
