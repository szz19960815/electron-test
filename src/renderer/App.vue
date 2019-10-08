<template>
  <div id="app">
    <div class="tip" v-if="hasTip">{{tipMsg}}!</div>
    <router-view></router-view>
  </div>
</template>

<script>
// electron 依赖
import { ipcRenderer } from "electron";

export default {
  name: "App",
  data() {
    return {
      tipMsg: '',
      hasTip: false
    };
  },
  mounted() {
    let self = this
    ipcRenderer.on("isOnlineRes", (evnet, val) => {
      // console.log(val ? "网络已连接" : "网络已断开");
      if (!val) {
        this.tipMsg = '网络已断开'
        this.hasTip = true
      }else{
        this.tipMsg = '网络已连接'
        this.hasTip = false
      }
    });
  }
};
</script>

<style lang="less" scoped>
#app{
  padding-top: 30px;
  position: relative;
  .tip{
    position: absolute;
    top: 0;
    left: 0;
    height: 30px;
    width: 100%;
    background: rgba(165, 196, 30, 0.3);
    color: red;
    font-size: 14px;
    line-height: 30px;
    overflow: hidden;
    padding: 0 15px;
  }
}
</style>
