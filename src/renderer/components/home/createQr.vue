<template>
  <div>
    <div id="createQr" ref="createQr"></div>
  </div>
</template>

<script>
import QrCode from 'qrcodejs2'
export default {
  data () {
    return {
      qrCode: null,
    }
  },
  mounted () {
    this.qrCode = new QrCode('createQr', {
      text: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4d296f359e572d84&redirect_uri=http://goxt1991.imwork.net/wechat/oauth2?type=GetOAuth2QrCode&token=ec7b6bd064dc494681b9e12b48eb8c76&response_type=code&scope=snsapi_userinfo&state=ec7b6bd064dc494681b9e12b48eb8c76#wechat_redirect',
      width: 150,
      height: 150
    })
  }
}
</script>

<style lant="less" scoped>
#createQr {
  width: 150px;
  height: 150px;
}
</style>