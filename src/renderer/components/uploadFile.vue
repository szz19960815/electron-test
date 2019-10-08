<template>
  <div id="uploadFile" @dragstart="dragUpload">
  </div>
</template>

<script>
export default {
  name: "uploadFile",
  methods: {
    dragUpload(e){
      e.preventDefault()
      console.log(e)
    }
  },
  mounted(){
  }
};
</script>

<style lang="less" scoped>
#uploadFile {
  border: 1px solid red;
  width: 300px;
  height: 200px;
  margin-left: 40px;
}
</style>
