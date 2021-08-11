<template>
  <div class="SongList">
    <!-- cover mode: 用v-for循环渲染缩略图 -->
    <ul class="covers" :style="{ display: MinDisplay }">
      <li class="cover" v-for="(img, index) in snacks" :key="img">
        <img
          :style="{ width: '90%' }"
          :src="img.img"
          class="min"
          @click="ZoomIn(index)"
          alt=""
        />
      </li>
      <!-- upload part -->
      <li class="cover">
      <el-upload
        action=""
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        @click='toSave'
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog v-model="visible">
        <img width="100%" id='cut_img' :src="imageUrl" alt="" />
      </el-dialog>
      </li>
    </ul>
    <!-- display mode -->
    <div :style="{ display: display }">
      <div class="small">
        <div
          :class="{ smallActive: index === ShowIndex }"
          v-for="(img, index) in snacks"
          :key="img"
          @click="select(index)"
        >
          <img :src="img.img" class="cover-small" />
        </div>
      </div>
      <br />
      <div
        @click="ZoomOut"
        v-for="(img, index) in snacks"
        :key="img"
        :class="[index === ShowIndex ? 'active' : 'None']"
      >
        <img :src="img.img" class="max" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.SongList {
  display: inline;
  width: 80%;
  border-radius: 10px;
}
.covers {
  justify-content: space-between;
  /* display: block; */
  flex-wrap: wrap;
}
.cover {
  object-fit: cover;
  /* justify-content: center; */
  width: 33%;
  margin: 10px 0;
}
li {
  list-style: none;
}
.min {
  border-radius: 10px;
  cursor: zoom-in;
}
.max {
  cursor: zoom-out;
  border-radius: 10px;
  width: 90%;
}
.small {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.cover-small {
  display: flex;
  justify-content: center;
  opacity: 0.6;
  cursor: pointer;
  width: 100px;
  height: 100px;
}
.cover-small:hover {
  opacity: 1;
}
.active {
  display: center;
}
.None {
  display: none;
}
.smallActive {
  opacity: 1;
}
</style>

<script>
import html2canvas from 'html2canvas'

export default {
  data: function () {
    return {
        // display snacks
      ShowIndex: 0,
      display: "none",
      MinDisplay: "flex",
      // Vue模板中使用v-for循环渲染图片时不能直接使用图片文件本地位置
      snacks: [{ img: require("../assets/gift.png") }],

        // upload scacks
        imageUrl:'',
        visible: false  
    };
  },
  mounted() {
    this.initSnacks();
  },
  methods: {
    //   display
    initSnacks() {
      var requireModule = require.context("../assets/snacks/", false, /\.jpg$/);

      this.snacks = [];
      for (var i = 0; i < requireModule.keys().length; i++) {
        this.snacks.push({
          img: require("../assets/snacks/" +
            requireModule.keys()[i].substr(2, requireModule.keys()[i].length)),
        });
      }
      console.log(this.snacks);
    },
    ZoomIn(i) {
      this.display = "block";
      this.MinDisplay = "none";
      this.ShowIndex = i;
    },
    ZoomOut() {
      this.display = "none";
      this.MinDisplay = "flex";
    },
    select(i) {
      this.ShowIndex = i;
    },

    // upload
    handleRemove(file, fileList){
        console.log(file, fileList);
    },
    handlePictureCardPreview(file){
        this.imageUrl = file.url;
        this.visible = true;
    },
     // 点击保存
     toSave () {
      html2canvas(document.getElementById("cut_img")).then(canvas => {
        let saveUrl = canvas.toDataURL('image/png')
        let aLink = document.createElement('a')
        let blob = this.base64ToBlob(saveUrl)
        let evt = document.createEvent('HTMLEvents')
        evt.initEvent('click', true, true)
        aLink.download = 'spot.jpg'
        aLink.href = URL.createObjectURL(blob)
        aLink.click()
        console.log(aLink.href)
        if (aLink.href) {
          console.log('保存成功')
        }
      })
    },
    // 这里把图片转base64
    base64ToBlob (code) {
      let parts = code.split(';base64,')
      let contentType = parts[0].split(':')[1]
      let raw = window.atob(parts[1])
      let rawLength = raw.length
      let uInt8Array = new Uint8Array(rawLength)
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }
      return new Blob([uInt8Array], { type: contentType })
    },
  },
};
</Script>
