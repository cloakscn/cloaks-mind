import {MindMapData} from "./MindMapData";

export class Text extends MindMapData {
    data: string;

    constructor(data: string) {
        super();
        this.data = data;
    }

    setData(data: string): void {
        this.data = data;
    }

    getData(): string {return this.data;}
}