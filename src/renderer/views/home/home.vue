<template>
  <div id="home">
    <div>
      截屏：
      <screen-capture></screen-capture>
    </div>
    <div>
      窗口置顶：
      <is-top></is-top>
    </div>
    <div>
      开机启动：
      <start-up></start-up>
    </div>
    <div>
      截图展示区域：
      <img v-if="imgUrl !== ''" :src="imgUrl" alt="">
    </div>
    <div>
      输入测试：
      <input-test></input-test>
    </div>
    <!-- <div>
      文件拖拽上传：
      <upload-file></upload-file>
    </div> -->
    <div>
      热更新：
      <hot-update></hot-update>
      测试更新区域：
      <update></update>
    </div>
    <div>
      窗口闪烁：
      <twinkle></twinkle>
    </div>
  </div>
</template>

<script>
// electron依赖
import { ipcRenderer, clipboard } from 'electron'
//自定义组件
import screenCapture from '../../components/screenCapture'
import isTop from '../../components/isTop'
import startUp from '../../components/startUp'
import inputTest from '../../components//inputTest'
import uploadFile from '../../components/uploadFile'
import hotUpdate from '../../components/hotUpdate'
import update from '../../update'
import twinkle from '../../components/twinkle'

export default {
  name: 'home',
  components:{ screenCapture, isTop, startUp, inputTest, uploadFile, hotUpdate, update, twinkle },
  data(){
    return {
      imgUrl: ''
    }
  },
  mounted(){
    ipcRenderer.on('captured', (event,val) => {
      console.log(clipboard.readImage().toDataURL())
      this.imgUrl = clipboard.readImage().toDataURL()
    })
  }
}
</script>

<style lang="less" scoped>
#home{
  width: 100%;
  height: 100%;
}
</style>
