<template>
  <ToolBar :is-movable="states.isMovable"
           :is-history="states.isHistory"
           :is-snap-line-enable="states.isSnapLineEnabled"
           :is-clipboard-enabled="states.isClipboardEnabled"
           :data="states.data"
           @init="init()"
           @togglePanning="togglePanning()"
           @switchHistory="switchHistory()"
           @switchSnapLine="switchSnapLine()"
           @switchClipboard="switchClipboard()"
           @dispose="dispose()"
           @undo="undo()"
           @redo="redo()"
           @onCopy="onCopy()"
           @onPaste="onPaste()"
           @fromJSON="fromJSON"
           @toJSON="toJSON"
  />
  <div id="graph"></div>
  <el-container id="minimap" class="minimap" style="box-shadow: var(--el-box-shadow)"></el-container>
  <el-card id="keyboard" class="keyboard" style="box-shadow: var(--el-box-shadow); width: 300px">
    <el-row>
      <el-col>
        <span>ctrl + 鼠标滚轮 -> 缩放</span>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import {Graph, Node, Edge} from '@antv/x6';
import {onMounted, ref} from "vue";
import ToolBar from './ToolBar.vue'
import {ElMessage} from 'element-plus'

interface State {
  offset: number
  useLocalStorage: boolean
}

let graph: Graph;

const states = ref({
  isMovable: true,
  isHistory: true,
  isSnapLineEnabled: true,
  isClipboardEnabled: true,
  // FIXME: 未生效
  options: {},
  data: "",
})

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
      shape: 'circle', // 使用 ellipse 渲染
      x: 500,
      y: 500,
      width: 80,
      height: 40,
      label: '!',
      attrs: {
        body: {
          fill: '#F39C12',
          stroke: '#000',
          rx: 16,
          ry: 16,
        },
        label: {
          text: '!',
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
    container: document.getElementById('graph'),
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    history: {
      enabled: true,
      ignoreAdd: true,
      ignoreRemove: true,
      ignoreChange: false,
    },
    snapline: {
      enabled: true,
      sharp: true,
      resizing: true,
    },
    // TODO: 滚动画布
    // scroller: {
    //   enabled: true,
    //   pannable: true,
    //   pageVisible: true,
    //   pageBreak: false,
    // },
    // TODO: 滚轮缩放
    mousewheel: {
      enabled: true,
      modifiers: ['ctrl', 'meta'],
    },
    // TODO: 剪切板
    clipboard: {
      enabled: true,
      useLocalStorage: true,
    },
    // TODO: 点击/框选 未生效
    selecting: {
      enabled: true,
      showNodeSelectionBox: true,
    },
    minimap: {
      enabled: true,
      container: document.getElementById('minimap'),
    },
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
  states.value.isMovable = true;
}

// switch movable
function togglePanning() {
  if (graph.isPannable()) {
    graph.disablePanning();
    states.value.isMovable = false;
    console.log('关闭画布');
  } else {
    graph.enablePanning();
    states.value.isMovable = true;
    console.log('开启画布');
  }
}

// switch history
function switchHistory() {
  if (graph.isHistoryEnabled()) {
    graph.disableHistory()
    states.value.isHistory = false;
    console.log('禁用 撤销/重做');
  } else {
    graph.enableHistory()
    states.value.isHistory = true;
    console.log('启用 撤销/重做');
  }
}

function switchSnapLine() {
  if (graph.isSnaplineEnabled()) {
    graph.disableSnapline()
    states.value.isSnapLineEnabled = false;
    console.log('启用对齐线');
  } else {
    graph.enableSnapline()
    states.value.isSnapLineEnabled = true;
    console.log('禁用对齐线');
  }
}

function switchClipboard() {
  if (graph.isClipboardEnabled()) {
    graph.disableClipboard()
    states.value.isClipboardEnabled = false;
    console.log('禁用剪切板');
  } else {
    graph.enableClipboard()
    states.value.isClipboardEnabled = true;
    console.log('启用剪切板');
  }
}

function undo() {
  graph.history.undo()
}

function redo() {
  graph.history.redo()
}

function onCopy() {
  const cells = graph.getSelectedCells()
  if (cells && cells.length) {
    graph.copy(cells, states.value.options)
    ElMessage({
      message: ('复制成功')
    })
  } else {
    ElMessage({
      message: ('请先选中节点再复制')
    })
  }
}

function onPaste() {
  if (graph.isClipboardEmpty()) {
    ElMessage({
      message: ('剪切板为空，不可粘贴')
    })
  } else {
    const cells = graph.paste(states.value.options)
    graph.cleanSelection()
    graph.select(cells)
    ElMessage({
      message: ('粘贴成功')
    })
  }
}

function toJSON() {
  debugger
  states.value.data = graph.toJSON()
}

function fromJSON(data: (Node.Metadata | Edge.Metadata)[]) {
  debugger
  console.log(data)
  graph.fromJSON(data);
}

function dispose() {
  console.log('销毁成功')
  graph.dispose()
}
</script>

<style scoped>
.minimap {
  position: fixed;
  z-index: 1;
  right: 10px;
  bottom: 10px;
}

.keyboard {
  position: fixed;
  z-index: 1;
  right: 10px;
  top: 10px;
}
</style>