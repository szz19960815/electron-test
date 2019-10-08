<template>
  <div id="hotUpdate">
    <div class="versionInfo">
      {{msg}}
      <span v-if="needUpdate">（新版功能）</span>
    </div>
    <el-button
      type="danger"
      v-loading="updateLoading"
      element-loading-background="rgba(0, 0, 0, 0)"
      @click="updateVersion"
    >升级</el-button>
  </div>
</template>

<script>
// node模块
import path from "path";
import fs from "fs";
import os from 'os'
import buffer from 'buffer'

export default {
  name: "hotUpdate",
  data() {
    return {
      currentVersion: "0.0.1",
      newVersion: "0.0.2",
      msg: "",
      needUpdate: false,
      updateLoading: false
    };
  },
  methods: {
    updateVersion() {
      this.updateLoading = true;
      // console.log((os.homedir()).replace(/\\/g,'/')+'/Desktop')
      const newFile = fs.readFileSync((os.homedir()).replace(/\\/g,'/')+'/Desktop/update.vue')
      // console.log(newFile)
      fs.writeFileSync(path.join(__dirname, '../update.vue'), newFile)
      setTimeout(() => {
        this.updateLoading = false;
      }, 3000);
    }
  },
  beforeMount() {
    const filePath = path.join(__dirname, "../../../package.json");
    const file = JSON.parse(fs.readFileSync(filePath));
    this.currentVersion = file.version;
    if (this.currentVersion !== this.newVersion) {
      this.msg = "可升级到" + this.newVersion;
      this.needUpdate = true;
    } else {
      this.msg = "当前版本：" + this.currentVersion;
      this.needUpdate = false;
    }
  }
};
</script>

<style lang="less" scoped>
#hotUpdate {
  display: flex;
  div {
    display: flex;
    align-items: center;
  }
  button {
    margin-right: 0;
    color: white;
    font-size: 16px;
  }
}
</style>
