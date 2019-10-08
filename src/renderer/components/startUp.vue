<template>
  <div id="startUp">
    <button type="button" @click="startUp(true)">开机启动</button>
    <button type="button" @click="startUp(false)">取消开机启动</button>
  </div>
</template>

<script>
// electron依赖
import { ipcRenderer } from 'electron'

export default {
  name: 'startUp',
  methods: {
    startUp (bool) {
      ipcRenderer.send('startUp', bool)
    }
  }
}
</script>

<style lang="less" scoped>
#startUp {
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
