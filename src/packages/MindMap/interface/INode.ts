import {MindMapData} from "../MindMapData/MindMapData";
import {G} from "@svgdotjs/svg.js"

export interface INode {
    id: string;
    nodeData: MindMapData;
    children: MindMapData[];

    // position
    width: number;
    height: number;
    left: number;
    top: number;

    // svg
    group: G

    getSize(): void;
    render(): void;

    add(node: INode): void;
    remove(node: INode): void;
    update(node: INode): void;
}