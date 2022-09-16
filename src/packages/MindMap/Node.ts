import {MindMapData} from "./MindMapData/MindMapData";
import {v4 as UUID} from "uuid"
import {
    Element,
    G,
    Text,
} from "@svgdotjs/svg.js"

/**
 * 节点类
 */
export class Node {
    id: string;
    nodeData: MindMapData;
    parent: Node;
    children: Array<Node>;
    height: number = 0;
    left: number;
    top: number;
    width: number = 0;
    group: G;
    draw: Element;
    isRoot: boolean = false;
    layerIndex: number = 0;

    constructor(
        nodeData: MindMapData,
        isRoot: boolean,
    ) {
        this.nodeData = nodeData;
        this.children = new Array();
        this.isRoot = isRoot;
        this.group = new G()
        this.id = UUID()
        this.getSize();
        // this.render();
    }


    getNode(): Node {
        return this;
    }

    /**
     * @Author: Cloaks
     * @Site: https://www.cloaks.cn
     * @Date: 15/9/2022 9:24 pm
     * @Desc: 获取文本宽高
     */
    getSize(): void {
        let node = new Text().text(this.nodeData.data);
        let { width, height } = node.bbox()// 获取文本节点的宽高
        this.height = height;
        this.width = width;
    }

    /**
     * @Author: Cloaks
     * @Site: https://www.cloaks.cn
     * @Date: 15/9/2022 9:25 pm
     * @Desc: 渲染
     */
    render(): void {
        let node = new Text().text(this.nodeData.data);
        // 文字节点相对于容器偏移内边距的大小
        node.x(10).y(5)
        // 创建一个矩形来作为边框
        this.group.rect(this.width, this.height).x(0).y(0)
        // 文本节点添加到节点容器里
        this.group.add(node)
        // 在画布上定位该节点
        this.group.translate(this.left, this.top)
        console.log(this.nodeData.data, this.left, this.top)
        // 容器添加到画布上
        // this.draw.add(this.group)
    }


    add(node: Node): Node {
        this.children.push(node)
        return this;
    }

    remove(node: Node): void {
    }

    update(node: Node): void {
        this.children?.forEach(item => {
            item = item.id === node.id ? node : item;
        })
    }
}
