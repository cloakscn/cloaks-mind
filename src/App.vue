<script setup lang="ts">
import { Graph } from '@antv/x6';
import {onMounted,ref} from "vue";

let graph: Graph;
const isPannable = ref(true);

const data = {
  // 节点
  nodes: [
    {
      id: 'node1',
      shape: 'rect', // 使用 rect 渲染
      x: 100,
      y: 200,
      width: 80,
      height: 40,
      label: 'hello',
      attrs: {
        body: {
          fill: '#2ECC71',
          stroke: '#000',
          strokeDasharray: '10,2',
        },
        label: {
          text: 'Hello',
          fill: '#333',
          fontSize: 13,
        }
      }
    },
    {
      id: 'node2',
      shape: 'ellipse', // 使用 ellipse 渲染
      x: 300,
      y: 200,
      width: 80,
      height: 40,
      label: 'world',
      attrs: {
        body: {
          fill: '#F39C12',
          stroke: '#000',
          rx: 16,
          ry: 16,
        },
        label: {
          text: 'World',
          fill: '#333',
          fontSize: 18,
          fontWeight: 'bold',
          fontVariant: 'small-caps',
        },
      },
    },
    {
      id: 'node3',
      shape: 'ellipse', // 使用 ellipse 渲染
      x: 500,
      y: 500,
      width: 80,
      height: 40,
      label: 'world',
      attrs: {
        body: {
          fill: '#F39C12',
          stroke: '#000',
          rx: 16,
          ry: 16,
        },
        label: {
          text: 'World',
          fill: '#333',
          fontSize: 18,
          fontWeight: 'bold',
          fontVariant: 'small-caps',
        },
      },
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      attrs: {
        line: {
          stroke: 'orange',
        },
      },
    },
    {
      source: 'node2',
      target: 'node3',
    },
  ],

};

function init() {
  graph = new Graph({
    container: document.getElementById('container'),
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    background: {
      color: '#fffbe6', // 设置画布背景颜色
    },
    grid: {
      size: 10,      // 网格大小 10px
      visible: true, // 渲染网格背景
    },
    panning: {
      enabled: true,
      // modifiers: 'shift',
      eventTypes: ['leftMouseDown', 'rightMouseDown', 'mouseWheel']
    },
  });
  // 渲染数据
  graph.fromJSON(data)
  // 缩放画布
  // graph.zoom(0.5)
  // 平移画布
  graph.translate(80, 40)
  graph.centerContent();

  reset();
}

onMounted(() => {
  init();
})

function reset() {
  isPannable.value = true;
}

function togglePanning() {
  if (graph.isPannable()) {
    isPannable.value = false;
    graph.disablePanning();
    console.log('关闭画布');
  } else {
    graph.enablePanning();
    isPannable.value = true;
    console.log('开启画布');
  }
}

function dispose() {
  console.log('销毁成功')
  graph.dispose()
}

</script>
<template>
  <div class="tool-options">
    <el-row>
      <el-button @click="togglePanning()">
        <span v-if="isPannable">关闭画布移动</span>
        <span v-else>开启画布移动</span>
      </el-button>
      <el-button @click="dispose()">清空画布</el-button>
      <el-button @click="init()">初始化画布</el-button>
    </el-row>
  </div>
  <div id="container"></div>
</template>
<style scoped>
.tool-options {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1;
}
</style>

