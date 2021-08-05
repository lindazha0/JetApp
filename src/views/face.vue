<template>
  <!-- <h1>Not finished yet</h1> -->
  <div class="camera_outer">
    <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
    <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
    <div v-if="imgSrc" class="img_bg_camera">
      <p>效果预览</p>
      <img :src="imgSrc" alt class="tx_img" />
    </div>
    <div class="button">
      <button @click="getCompetence()">打开摄像头</button>
      <button @click="stopNavigator()">关闭摄像头</button>
      <button @click="setImage()">拍照</button>
    </div>
  </div>

</template>

<style>
.info2 {
  width: 10%;
  height: 100px;
}
.box {
  display:flex;
}
</style>

<script src="./faceScript.js">
navigator.getUserMedia || (navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia);
</script>
