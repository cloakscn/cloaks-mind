import {
    MindMap,
    Node
} from './index'

export class Render {

    // 布局列表
    // 逻辑结构图
    // logicalStructure: LogicalStructure,
    // 思维导图
    mindMap: MindMap = new MindMap();
    // 目录组织图
    // catalogOrganization: CatalogOrganization,
    // 组织结构图
    // organizationStructure: O

    // 第一次遍历渲染树
    recursion(node: Node): Node {
        if (node.isRoot) {
            // 定位在画布中心位置
            node.left = (this.mindMap.width - node.width) / 2;
            node.top = (this.mindMap.height - node.height) / 2;
            // this.recursion(node.children);
        } else {
            // 非根节点
            node.left = node.parent.left + node.parent.width + 50;
            node.top = node.parent.top + node.parent.height + 20;
        }
        node.render();
        node.children.forEach((child) => {
            if (child instanceof Node) {
                this.recursion(child);
            }
        })
        return node;
    }
}