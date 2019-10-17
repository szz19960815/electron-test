<template>
  <div id="isTop">
    <button type="button" @click="toTop(true)">窗口置顶</button>
    <button type="button" @click="toTop(false)">取消置顶</button>
  </div>
</template>

<script>
// electron依赖
import { ipcRenderer } from 'electron'

export default {
  name: 'isTop',
  methods: {
    toTop (val) {
      if (val) ipcRenderer.send('isTop')
      else ipcRenderer.send('noTop')
    }
  }
}
</script>

<style lang="less" scoped>
#isTop {
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
