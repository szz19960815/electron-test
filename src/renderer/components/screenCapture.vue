<template>
  <div id="screenCapture">
    <button
      type="button"
      @click="capture(1)"
    >隐藏窗口后截屏</button>
    <button
      type="button"
      @click="capture(2)"
    >直接截屏</button>
  </div>
</template>

<script>
import { desktopCapturer, remote, ipcRenderer } from "electron";
const screen = remote.screen;
const BrowserWindow = remote.BrowserWindow;

export default {
  name: "screenCapture",
  data() {
    return {
      captureObj: {}
    };
  },
  methods: {
    capture(a) {
      // 打开截屏窗口
      ipcRenderer.send("capture", {type: a});
    }
  }
};
</script>

<style lang="less" scoped>
#screenCapture {
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
