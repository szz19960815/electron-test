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
      <!-- <hot-update></hot-update> -->
      测试更新区域：
      <!-- <update></update> -->
    </div>
    <div>
      窗口闪烁：
      <twinkle></twinkle>
    </div>
    <div>
      新建webview
      <create-view></create-view>
    </div>
    <div>
      生成二维码
      <create-qr></create-qr>
    </div>
  </div>
</template>

<script>
// electron依赖
import { ipcRenderer, clipboard } from 'electron'
//自定义组件
import screenCapture from '../../components/home/screenCapture'
import isTop from '../../components/home/isTop'
import startUp from '../../components/home/startUp'
import inputTest from '../../components/home//inputTest'
import uploadFile from '../../components/home/uploadFile'
import hotUpdate from '../../components/home/hotUpdate'
import update from '../../update'
import twinkle from '../../components/home/twinkle'
import createView from '../../components/home/createView'
import createQr from '../../components/home/createQr'

export default {
  name: 'home',
  components:{ screenCapture, isTop, startUp, inputTest, uploadFile, hotUpdate, update, twinkle, createView, createQr },
  data(){
    return {
      imgUrl: ''
    }
  },
  methods:{
    closeTask(){
      ipcRenderer.send('closeTask')
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
