<template>
  <!-- <div class="about">
    <h1>This is an new page</h1>
    <input id="button" value="自动播放" type="button" v-on:click="run()" />
    <input id="button" value="暂停播放" type="button" v-on:click="stop()" />
    <input id="button" value="上一个" type="button" v-on:click="last()" />
    <input id="button" value="下一个" type="button" v-on:click="cycle()" />
    <br />
    <img id="banner" alt="banner" src="../assets/img/1.jpg" width="200" />
    <br />
  </div>
  <br/> -->
  <div>
    <input
      type="file"
      accept="image/*"
      @change="changeImage()"
      ref="avatarInput"
      style="display: none"
    />
    <!-- 替换自己的上传图标 -->
    <el-button type="primary" @click="upLoad"
      >上传图片<i class="el-icon-upload"></i
    ></el-button>
    <br />
    <div class="pic_list_box">
      <div class="pic_list" v-show="imgDatas.length">
        <div v-for="(src, index) in imgDatas" :key="index">
          <!-- <img :src="src" width="80" height="80" alt srcset /> -->
          <!-- 利用element-ui的图片预览插件 -->
          <el-image
            style="width: 200px; height: 200px"
            :src="src"
            :preview-src-list="imgDatas"
          >
          </el-image>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
.pic_list_box {
  display: flex;
}

.pic_list {
  display: flex;
}
</style>

<script>
import "element-ui/lib/theme-chalk/index.css";

export default {
  data() {
    return {
      imgDatas: [],
    };
  },
  methods: {
    changeImage() {
      // 上传图片事件
      var files = this.$refs.avatarInput.files;
      var that = this;
      function readAndPreview(file) {
        //Make sure `file.name` matches our extensions criteria
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
          var reader = new FileReader();
          reader.onload = function (e) {
            // 防止重复上传
            if (that.imgDatas.indexOf(e.target.result) === -1) {
              that.imgDatas.push(e.target.result);
            }
          };
          reader.readAsDataURL(file);
        }
      }
      readAndPreview(files[0]);
      if (files.length === 0) {
        return;
      }

      // 文件上传服务器
      // this.setUploadFile(files[0])
    },
    setUploadFile(file) {
      this.formData = new FormData();
      this.formData.append("files", file, file.name); // 添加到请求体
      this.$http
        .post("/api/dxbase/upload?resType=EVENT", this.formData)
        .then((res) => {
          console.log(res);
        });
    },
    upLoad() {
      // 触发上传图片按钮
      this.$refs.avatarInput.dispatchEvent(new MouseEvent("click"));
    },
  },
};
</script>

// export default {
//   name: "ShowImage",
//   components: {},
//   data: function () {
//     return {
//       imgSrc: require("../assets/img/1.jpg"),
//       banners: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"], // 图片地址
//       counter: "0",
//       int: "",
//     };
//   },
//   mounted() {},
//   methods: {
//     run: function () {
//       this.int = setInterval("cycle()", 1000); //重复运行cycle函数，周期1000ms
//     },
//     stop: function () {
//       this.int = window.clearInterval(this.int);
//     },
//     cycle: function () {
//       this.counter++;
//       if (this.counter == this.banners.length) this.counter = 0;
//       document.getElementById("banner").src =
//         "../assets/img/" + this.banners[this.counter];
//       console.log(document.getElementById("banner").src);
//     },
//     last: function () {
//       this.counter--;
//       if (this.counter == -1) this.counter = this.banners.length - 1;
//       document.getElementById("banner").src =
//         "../assets/img/" + this.banners[this.counter];
//     },

//   },
// };