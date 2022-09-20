import {func as separateTree} from './separate-root';
import {Node} from "./Node";

const VALID_DIRECTIONS = [
    'LR', // left to right
    'RL', // right to left
    'TB', // top to bottom
    'BT', // bottom to top
    'H', // horizontal
    'V' // vertical
];
const HORIZONTAL_DIRECTIONS = [
    'LR',
    'RL',
    'H'
];
const isHorizontal = (direction: string) => HORIZONTAL_DIRECTIONS.indexOf(direction) > -1;
const DEFAULT_DIRECTION = VALID_DIRECTIONS[0];

// todo 根据 layout algorithm 构造布局结构
export function func(root: Node,
                     options: any,
                     layoutAlgorithm: (root: Node, options: any) => void) {
    const direction = options.direction || DEFAULT_DIRECTION;
    options.isHorizontal = isHorizontal(direction);
    if (direction && VALID_DIRECTIONS.indexOf(direction) === -1) {
        throw new TypeError(`Invalid direction: ${direction}`);
    }

    if (direction === VALID_DIRECTIONS[0]) {
        // LR
        layoutAlgorithm(root, options);
    } else if (direction === VALID_DIRECTIONS[1]) {
        // RL
        layoutAlgorithm(root, options);
        root.right2left();
    } else if (direction === VALID_DIRECTIONS[2]) {
        // TB
        layoutAlgorithm(root, options);
    } else if (direction === VALID_DIRECTIONS[3]) {
        // BT
        layoutAlgorithm(root, options);
        root.bottom2top();
    } else if (direction === VALID_DIRECTIONS[4] || direction === VALID_DIRECTIONS[5]) {
        // H or V
        // separate into left and right trees
        const {left, right} = separateTree(root, options);
        // do layout for left and right trees
        layoutAlgorithm(left, options);
        layoutAlgorithm(right, options);
        options.isHorizontal ? (left.right2left()) : (left.bottom2top());
        // combine left and right trees
        right.translate(left.x - right.x, left.y - right.y);
        // translate root
        root.x = left.x;
        root.y = right.y;
        const bb = root.getBoundingBox();
        if (options.isHorizontal) {
            if (bb.top < 0) {
                root.translate(0, -bb.top);
            }
        } else {
            if (bb.left < 0) {
                root.translate(-bb.left, 0);
            }
        }
    }
    // fixed root position, default value is true
    let fixedRoot = options.fixedRoot;
    if (fixedRoot === undefined) fixedRoot = true;
    if (fixedRoot) {
        root.translate(-(root.x + root.width / 2 + root.hgap), -(root.y + root.height / 2 + root.vgap));
    }
    return root;
}
