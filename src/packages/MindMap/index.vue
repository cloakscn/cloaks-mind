<template>

</template>

<script setup lang="ts">
import {Node} from "./Node";
import {Text} from "./MindMapData";
import {SVG} from "@svgdotjs/svg.js";
import {Render} from "./Render";

import {data1} from "./exampleData";

let node = new Node(new Text(data1["root"]["data"]["text"]), true);
const draw = SVG().addTo('body').size(document.documentElement.clientWidth, document.documentElement.clientHeight);
const group = draw.group();

function constructTree(data1: Object, parent: Node) {
  let node1 = new Node(new Text(""), false);
  node1.parent = parent;
  for (const item in data1) {
    if (item === "data") {
      node1.nodeData.data = new Text(data1[item]["text"]);
      node1.nodeData.data = node1.nodeData.data.data;
      parent.add(node1);
    } else if (item === "children") {
      node1 = constructTree(data1[item], node1);
    } else {
      parent = constructTree(data1[item], parent)
    }
  }
  return parent;
}

function init() {
  node = constructTree(data1["root"]["children"], node);
  // const text = new Text("HelloWorld");
  // let node = new Node(text, null);
  node = new Render().recursion(node);
  // node.render();
  render(node);
}

function render(node: Node) {
  group.add(node.group);
  node.children.forEach((child) => {
    if (child instanceof Node) {
      render(child);
    }
  });
}

init();
</script>

<style scoped>

</style>