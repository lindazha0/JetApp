<template>
  <div class="camera">
    <div class="button">
      <el-button type='success' size="small" @click="getCompetence()">打开摄像头</el-button>
      <el-button type='success' size="small" @click="stopNavigator()">关闭摄像头</el-button>
      <el-button type='success' size="small" @click="setImage()">拍照</el-button>
      <el-button type='success' size="small" @click="getAccessToken()">测试token api</el-button>
    </div>
    <!-- 视频外面的框框 -->
    <div class="box">
      <video
        id="videoCamera"
        :width="videoWidth"
        :height="videoHeight"
        autoplay
      ></video>
    </div>
    <canvas
      style="display: none"
      id="canvasCamera"
      :width="videoWidth"
      :height="videoHeight"
    ></canvas>
    <div v-if="imgSrc" class="img_bg_camera">
      <p>效果预览</p>
      <el-button type='success' size="small" @click="getFaceDetect">
        打卡
      </el-button>
      <el-button type='success' size="small" title='只能上传jpg/png文件，且不超过500kb' @click="toSave">
        保存靓照
      </el-button>
      <el-button type='success' size="small" @click="deleteImage()">
        删除</el-button>
      <br/>
      <img :src="imgSrc" alt class="tx_img" id="cut_img" />
      
    </div>
  </div>
</template>

<style scoped>
.box {
  width: 250px;
  height: 350px;
  border: 3px solid #2722;
  margin: auto;
}
#videoCamera {
  margin: auto;
}
</style>

<script src="./faceScript.js">
navigator.getUserMedia ||
  (navigator.getUserMedia =
    navigator.mozGetUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.msGetUserMedia);
</script>
