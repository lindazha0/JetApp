<template>
  <div class="camera">
    <div class="button">
      <button @click="getCompetence()">打开摄像头</button>
      <button @click="stopNavigator()">关闭摄像头</button>
      <button @click="setImage()">拍照</button>
      <button @click="dataURLtoFile(imgSrc, 'newImg')">上传</button>
    </div>
    <div class="box">
    <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
    </div>
    <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
    <div v-if="imgSrc" class="img_bg_camera">
      <p>效果预览</p>
      <img :src="imgSrc" alt class="tx_img" />
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
#videoCamera{
  margin: auto;
}
</style>

<script src="./faceScript.js">
navigator.getUserMedia || (navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia);
</script>
