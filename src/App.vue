<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Node from "./packages/MindMap/index.vue"
import Hierarchy from '@antv/hierarchy'
interface MindMapData {
  id: string
  type: 'topic' | 'topic-branch' | 'topic-child'
  label: string
  width: number
  height: number
  children?: MindMapData[]
}

const data: MindMapData = {
  id: '1',
  type: 'topic',
  label: '中心主题',
  width: 160,
  height: 50,
  children: [
    {
      id: '1-1',
      type: 'topic-branch',
      label: '分支主题1',
      width: 100,
      height: 40,
      children: [
        {
          id: '1-1-1',
          type: 'topic-child',
          label: '子主题1',
          width: 60,
          height: 30,
        },
        {
          id: '1-1-2',
          type: 'topic-child',
          label: '子主题2',
          width: 60,
          height: 30,
        },
      ],
    },
    {
      id: '1-2',
      type: 'topic-branch',
      label: '分支主题2',
      width: 100,
      height: 40,
    },
  ],
}

interface HierarchyResult {
  id: string
  x: number
  y: number
  data: MindMapData
  children?: HierarchyResult[]
}

const render = () => {
  const result: HierarchyResult = Hierarchy.mindmap(data, {
    direction: 'H',
    getHeight(d: MindMapData) {
      return d.height
    },
    getWidth(d: MindMapData) {
      return d.width
    },
    getHGap() {
      return 40
    },
    getVGap() {
      return 20
    },
    getSide: () => {
      return 'right'
    },
  })
  console.log(result)
  const traverse = (hierarchyItem: HierarchyResult) => {

  }
  traverse(result)
}

render()
</script>
<template>
<!--  <Node/>-->
</template>

<style scoped>

</style>

