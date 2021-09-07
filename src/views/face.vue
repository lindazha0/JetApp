<template>
  <div class="camera" v-loading="loading" element-loading-text="Loading...">
    <div class="button">
      <el-button type="success"   @click="getCompetence()"
        >打开摄像头</el-button
      >
      <el-button type="success"   @click="setImage()"
        >拍照</el-button
      >

      <!-- 视频外面的框框 -->
      <div class="box" :style="{ display: play }">
        <video
          id="videoCamera"
          :width="videoWidth"
          :height="videoHeight"
          autoplay
        ></video>
      </div>
      <!-- draw photo -->
      <canvas
        style="display: none"
        id="canvasCamera"
        :width="videoWidth"
        :height="videoHeight"
      ></canvas>
      <!-- display photo -->
      <div v-if="imgSrc" class="img_bg_camera">
        <br />
        <img :src="imgSrc" alt class="tx_img" id="cut_img" />
        <br />
        <el-button type="success"   @click="getFaceDetect">
          打卡
        </el-button>
        <el-button
          type="success"
           
          title="只能上传jpg/png文件，且不超过500kb"
          @click="toSave"
        >
          保存靓照
        </el-button>
        <el-button type="success"   @click="deleteImage()">
          删除</el-button
        >
      </div>

      <br />
      <el-dropdown @command="visualizeTestDialog">
        <el-button type="success"  
          >人脸库管理<i class="el-icon-arrow-down el-icon--right"></i
        ></el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="1">人脸注册</el-dropdown-item>
            <el-dropdown-item command="2">人脸编辑</el-dropdown-item>
            <el-dropdown-item command="3">人脸更新</el-dropdown-item>
            <el-dropdown-item command="4">人脸查询</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <el-dialog title="注册人脸信息" v-model="dialogVisible['1']">
      <input
        type="file"
        accept="image/*"
        @change="changeImage()"
        ref="avatarInput"
        style="display: none"
      />
      <!-- 替换自己的上传图标 -->
      <el-button type="success" @click="upLoad"  
        >选择照片</el-button
      >
      <el-button
        type="success"
         
        @click="confirmAddFace(tmp, user_id)"
        icon="el-icon-upload"
        >注册人脸</el-button
      >
        <el-button icon="el-icon-refresh" circle type='success' @click="user_id='';tmp='';displayUploadImg='none'"></el-button>
      <br />
      <el-input
        v-model="user_id"
        placeholder="please enter the user_id"
      ></el-input>
      <el-image
        :src="tmp"
        :height="200"
        :style="{display: displayUploadImg }"
      ></el-image>
      <div style="color: #666666,font-size:12px">用户名必须为数字、字母、下划线的组合</div>
    </el-dialog>

    <el-dialog title="编辑人脸信息库" v-model="dialogVisible['2']">
      <div class="input_with_label">
        <!-- <el-input placeholder="please enter the log_id" v-model="log_id">
          <template #prepend class="prepend"> log_id: </template>
        </el-input> -->
      </div>
      <br />
      <div class="input_with_label">
        选择用户及人脸信息
        <el-select v-model='selected_user_id' placeholder="请选择用户名">
          <template #prepend class="prepend"> log_id: </template>
        <el-option
          v-for="(user_id, index) in user_id_list"
          :key="index"
          :value="user_id"
          :label="user_id"
          ></el-option>
        </el-select>
        <el-button icon="el-icon-search" circle type='success' @click="getFaceTokens(selected_user_id)"></el-button>
        <el-button icon="el-icon-plus" circle type='success' @click="visualizeTestDialog('1')"></el-button>
          <!-- <template #prepend class="prepend"> user_id: </template> -->
      </div>
      <br />
      <div class="input_with_label">
        <el-table :data="face_token_list" style="width:100%">
          <el-table-column prop="ctime" label='创建时间' width="150"></el-table-column>
          <el-table-column prop="face_token" label='人脸编号' width="250"></el-table-column>
          <el-table-column align='right'>
            <template #default='scope'>
            <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <el-dialog
      title="更新用户人脸信息"
      v-model="dialogVisible['3']"
    ></el-dialog>

    <el-dialog
      title="查询用户人脸信息"
      v-model="dialogVisible['4']"
    >
    <input
        type="file"
        accept="image/*"
        @change="changeImage()"
        ref="avatarInput"
        style="display: none"
      />
      <!-- 替换自己的上传图标 -->
      <el-button type="success" @click="upLoad" round
        >选择照片</el-button
      >
      <el-button
        type="success" circle
        icon="el-icon-search"         
        @click="searchFace(tmp)"
        ></el-button
      >
        <el-button icon="el-icon-refresh" type='success' circle @click="user_id='';tmp='';displayUploadImg='none'"></el-button>
      <br />
      <el-image
      id="searchImage"
      class='el-image__inner'
        :src="tmp"
        :style="{display: displayUploadImg }"
      ></el-image>
    </el-dialog>
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
.input_with_label {
  display: inline-block;
  width: 500px;
}
.prepend {
  width: 80px;
}
.el-image__inner {
    vertical-align: top;
    width: 200px;
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
