<template>
  <div id="twinkle">
    <button type="button" @click="twinkle">窗口闪烁</button>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'twinkle',
  methods: {
    twinkle() {
      ipcRenderer.send('twinkle')
    }
  }
}
</script>

<style lang="less" scoped>
#twinkle {
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
