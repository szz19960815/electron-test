<template>
  <div id="createView">
    <button type="button" @click="create">新建webview</button>
    <button type="button" @click="remove">关闭webview</button>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: "createView",
  methods: {
    create() {
      ipcRenderer.send('createView')
    },
    remove () {
      ipcRenderer.send('removeView')
    }
  }
}
</script>

<style lang="less" scoped>
#createView {
  button {
    margin: 20px;
    margin-right: 0;
    padding: 10px;
    background: orange;
    color: white;
    font-size: 16px;
    border-radius: 5px;
  }
}
</style>