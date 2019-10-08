<template>
  <div id="inputTest">
    <!-- <el-input type="textarea" :row='2' placeholder="请输入内容" v-model="txt"></el-input> -->
    <quill-editor
      id="quillEditor"
      v-model="txt"
      :options="options"
      ref="quill"
      @keydown.v.native='paste'
      @change="change"
    ></quill-editor>
  </div>
</template>

<script>
// 引入富文本编辑器
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
// electron依赖
import { clipboard } from "electron";
export default {
  name: "inputTest",
  components: { quillEditor },
  data() {
    return {
      txt: '',
      options: {
        modules: {
          toolbar: ''
        },
        placeholder: '',
      }
    };
  },
  methods: {
    paste(e) {
      if (e.ctrlKey) {
        // console.log(clipboard.availableFormats())
        if (clipboard.readText()) {
          console.log(clipboard.readText());
        } else if (!clipboard.readImage().isEmpty()) {
          this.txt += `<img src="${clipboard
            .readImage()
            .toDataURL()}" title="图片" alt="加载失败..." />`;
          this.txt += '&nbsp;'
        } else return;
        // this.$refs.quill.quill.setSelection(this.txt.length,0)
        // console.log(this.txt)
      }
    },
    change() {
      let quill = this.$refs.quill.quill;
      let length = quill.getSelection().index
      console.log(length)
    },
    mounted() {
      window.addEventListener("paste", e => {
        e.cancelBubble = true;
        console.log("paste:" + e.target);
      });
      window.addEventListener("copy", e => {
        // console.log(e)
      });
    }
  }
};
</script>

<style lang="less">
#inputTest{
  border: 1px solid #666;
}
.ql-container.ql-snow{
  border: none;
}
</style>
