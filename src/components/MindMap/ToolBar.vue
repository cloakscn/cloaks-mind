<script setup lang="ts">
import {ref} from 'vue'
import {ElMessageBox} from 'element-plus'

const props = defineProps<{
  isMovable: boolean,
  isHistory: boolean,
  isSnapLineEnable: boolean,
  isClipboardEnabled: boolean,
  data: string,
}>()

const emits = defineEmits([
  'togglePanning',
  'switchSnapLine',
  'switchHistory',
  'switchClipboard',
  'dispose',
  'init',
  'undo',
  'redo',
  'onCopy',
  'onPaste',
  'fromJSON',
  'toJSON',
]);

const dialogVisible = ref(false);
const data = ref("");

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
}

</script>

<template>
  <el-tabs type="border-card" class="demo-tabs">
    <el-tab-pane label="文件">
      <el-button @click="dialogVisible = true">导出</el-button>
      <el-button @click="dialogVisible = true">导入</el-button>
    </el-tab-pane>
    <el-tab-pane label="基础功能">
      <el-button @click="$emit('togglePanning')">
        <span v-if="props.isMovable">关闭画布移动</span>
        <span v-else>开启画布移动</span>
      </el-button>
      <el-button @click="$emit('switchHistory')">
        <span v-if="props.isHistory">禁用 撤销/重做</span>
        <span v-else>启用 撤销/重做</span>
      </el-button>
      <el-button @click="$emit('switchSnapLine')">
        <span v-if="props.isSnapLineEnable">禁用对齐线</span>
        <span v-else>启用对齐线</span>
      </el-button>
      <el-button @click="$emit('switchClipboard')">
        <span v-if="props.isClipboardEnabled">禁用剪切板</span>
        <span v-else>启用剪切板</span>
      </el-button>
      <el-button @click="$emit('undo')" :disabled="!props.isHistory">撤销</el-button>
      <el-button @click="$emit('redo')" :disabled="!props.isHistory">重做</el-button>
      <el-button @click="$emit('onCopy')" :disabled="!props.isClipboardEnabled">复制</el-button>
      <el-button @click="$emit('onPaste')" :disabled="!props.isClipboardEnabled">粘贴</el-button>
      <el-button @click="$emit('dispose')">清空画布</el-button>
      <el-button @click="$emit('init')">初始化画布</el-button>
    </el-tab-pane>
    <el-tab-pane label="进阶实战">Config</el-tab-pane>
    <el-tab-pane label="高级指引">Role</el-tab-pane>
  </el-tabs>

  <!--导入导出弹出框-->
  <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
  >
    <el-input
        v-model="data"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        placeholder="Please input"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button v-if="data != ''" type="primary" @click="$emit('fromJSON', data); dialogVisible = false">导入</el-button>
        <el-button v-else type="primary" @click="$emit('toJSON'); dialogVisible = false">导出</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}

.demo-tabs {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1;
  width: 60%;
}
</style>
