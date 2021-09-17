import html2canvas from "html2canvas"
import Qs from 'qs'
import tracking from "@/assets/tracking/build/tracking-min.js";
import "@/assets/tracking/build/data/face-min.js";

export default {
  data() {
    return {
      videoWidth: 320,
      videoHeight: 240,
      imgSrc: "",
      tmp: '', // test image in base64
      thisCanvas: null,
      thisContext: null,
      thisVideo: null,
      openVideo: false,
      play: "block",

      // interface
      dialogVisible: {
        '1': false,
        '2': false,
        '3': false,
        '4': false,
      },
      loading: false,

      // baidu api
      token: '',
      log_id: '',
      user_id: '', // add face
      selected_user_id: '',//search face
      user_id_list: [],
      face_token: '',
      selected_face_token: '',
      face_token_list: [],
      displayUploadImg: 'none',
      error_msg: '',//deal with error
      predict_user: '',
      predict_score: '',

      // draw border on image
      uploadLock: true
    };
  },
  mounted() {
    // this.getCompetence()
  },
  methods: {
    // #region camera
    // 调用权限（打开摄像头功能）
    getCompetence() {
      var _this = this;
      _this.play = 'block'; // display video
      _this.imgSrc = ''; // hide photo

      _this.thisCanvas = document.getElementById("canvasCamera");
      _this.thisContext = this.thisCanvas.getContext("2d");

      _this.thisVideo = document.getElementById("videoCamera");
      _this.thisVideo.style.display = 'block';

      let canvas = document.getElementById('canvasBorder');
      let context = canvas.getContext('2d');

      // #region camera shot
      // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia =
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.getUserMedia;
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {//不存在则报错
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      var constraints = {
        audio: false,
        video: {
          width: this.videoWidth,
          height: this.videoHeight,
          transform: "scaleX(-1)"
        }
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          // 旧的浏览器可能没有srcObject
          if ("srcObject" in _this.thisVideo) {
            _this.thisVideo.srcObject = stream;
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream);
          }
          _this.thisVideo.onloadedmetadata = function (e) {
            _this.thisVideo.play();
          };
        })
        .catch(err => {
          console.log(err);
        });
      // #endregion

      // #region face bounding box
      // // 固定写法
      let tracker = new window.tracking.ObjectTracker("face");
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);
      window.tracking.track("#videoCamera", tracker, {
        camera: true,
      });

      tracker.on("track", function (event) {
        // 检测出人脸 绘画人脸位置
        context.clearRect(0, 0, canvas.width, canvas.height);
        // put face in the circle
        context.beginPath();
        context.rect(0,0,canvas.width,canvas.height, false)
        context.closePath();
        context.arc(canvas.width/2, canvas.height/2, 90, 0, 2 * Math.PI, true);
        context.closePath();
        
        context.fillStyle = "#3f6b46";
        context.fill();
        // context.strokeRect(canvas.width/4, canvas.height/4, canvas.width/4, canvas.height/4);
        event.data.forEach(function (rect) {
          if(rect.x<canvas.width/4 || rect.x>canvas.width/2 || rect.y<canvas.height/4 || rect.y>canvas.height/2){
            return
          }
        context.strokeStyle = "#0764B7";
        context.lineWidth=2;
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);

          context.font = '11px Helvetica';
          context.fillStyle = "#0764B7";
          context.fillText(_this.predict_user + '  ' + _this.predict_score, rect.x - 5, rect.y + rect.height + 11);

          // 上传图片
          if (_this.uploadLock) {
            _this.screenshotAndUpload();
          }
        });
      });
      //#endregion
    },
    // 上传图片
    async screenshotAndUpload() {
      // 上锁避免重复发送请求
      console.log("catch human face!");
      this.uploadLock = false;

      // 绘制当前帧图片转换为base64格式
      // 使用 base64Img 请求接口即可
      let shot = this.setImage(),
        _this = this
      await this.searchFace(shot)

      if (parseInt(this.predict_score) < 20) {
        this.thisVideo.srcObject.getTracks()[0].stop();
        var msg='I do not seem to recognize you,\nwould you please register your face?'
        var url = `https://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=6&text=${encodeURI(msg)}`;
      let voice = new Audio(url);
      voice.play();
        this.$confirm(msg, 'Alert', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            _this.tmp = shot
            _this.visualizeTestDialog(1)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消注册',
            })
          })
      }
      var msg='Welcome, ' + this.predict_user
      if (parseInt(this.predict_score) > 70) {
        this.thisVideo.srcObject.getTracks()[0].stop();
        this.$message({
          type: 'success',
          showClose: true,
          message: msg
        })
        var url = `https://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=6&text=${encodeURI(msg)}`;
      let voice = new Audio(url);
      voice.play();
        if (this.predict_user == this.$root.birth_name) {
          this.$root.birth_login = true;
          this.$router.push('/birth');
        }
        else {
          this.$router.go(-1)
        }
      }

      // 请求接口成功以后打开锁
      this.uploadLock = true;
    },
    //  绘制图片并存为base64（拍照功能）
    setImage() {
      var _this = this;
      // canvas画图
      _this.thisContext.drawImage(
        _this.thisVideo,
        0,
        0,
        _this.videoWidth,
        _this.videoHeight
      );
      // 获取图片base64链接
      var image = this.thisCanvas.toDataURL("image/png");
      return image;// display photo, 赋值并预览图片
    },
    // take photo
    takePhoto() {
      this.imgSrc = this.setImage()

      // close camera
      this.thisVideo.srcObject.getTracks()[0].stop();
      this.play = 'none'; // hide video
    },
    deleteImage() {
      var _this = this;
      _this.imgSrc = '';
      _this.play = 'block';
    },
    // base64转文件，此处没用到
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(",");
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime });
      console.log(file);
      return file;
    },
    // 点击保存
    toSave() {
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
    // 这里转base64->blob
    base64ToBlob(code) {
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
    handleRemove(file) {
      // 1.获取将要删除图片的临时路径
      const filePath = file.response.data.tmp_path
      // 2.从pics数组中，找到图片对应的索引值
      const i = this.formData.pics.findIndex(x => x.pic === filePath)
      // 3.调用splice方法，移除图片信息
      this.formData.splice(i, 1)
    },
    addFaceFromCamera() {
      console.log(this.imgSrc)
      this.tmp = this.imgSrc
      this.visualizeTestDialog(1)
    },
    // #endregion

    // #region api interface
    async visualizeTestDialog(id) {
      this.dialogVisible[id] = true
      // console.log(this.dialogVisible)
      if (id == 2) {
        // delete face
        this.user_id_list = []
        let _ = await this.getUsers()
        return
      }
      return
    },
    changeImage() {
      // 上传图片事件
      var file = this.$refs.avatarInput.files;
      var that = this;
      function readAndPreview(file) {
        //Make sure `file.name` matches our extensions criteria
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
          var reader = new FileReader();
          reader.onload = function (e) {
            that.tmp = e.target.result
            // console.log(e.target.result)
          }
          let tamp = reader.readAsDataURL(file);
        }
      }
      readAndPreview(file[0]);
      if (file.length === 0) {
        return;
      }
      that.displayUploadImg = 'flex'
    },
    upLoad() {
      // 触发上传图片按钮
      this.$refs.avatarInput.dispatchEvent(new MouseEvent("click"));
    },
    async confirmAddFace(image, user_id) {
      if (user_id.length == 0) {
        this.$message({
          type: 'info',
          message: '请输入用户名',
        })
        return
      }
      if (image.length == 0) {
        this.$message({
          type: 'info',
          message: '请选择照片',
        })
        return
      }
      this.$confirm('此操作将为用户"' + user_id + '"注册一张新的人脸，是否继续？', 'Alert', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          this.loading = true
          await this.addFace(image, user_id)
          this.loading = false
          if (this.error_msg == 'SUCCESS') {
            this.$message({
              type: 'success',
              message: '注册成功！',
            })
          }
          else {
            console.log(this.error_msg)
            alert(this.error_msg)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注册',
          })
        })
    },
    handleDelete(index, row) {
      // console.log(index, row)
      this.$confirm('此操作将删除用户"' + this.selected_user_id + '"的一张面部信息，若删除唯一信息则该用户名失效，是否继续？', 'Alert', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          this.loading = true
          await this.deleteFace(this.log_id, this.selected_user_id, row.face_token)
          this.loading = false
          if (this.error_msg == 'SUCCESS') {
            this.$message({
              type: 'success',
              message: '删除成功！',
            })
            await this.getFaceTokens(this.selected_user_id)//update face_token_list
            if (this.face_token_list.length == 0) {
              await this.getUsers()
            }
          }
          else {
            alert(this.error_msg)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    // draw binding box
    drawBindingBox(x, y, w, h, rotate) {
      d3.select('svg').append('rect')
        .attr('x', x + 'px')
        .attr('y', y + 'px')
        .attr('width', w + 'px')
        .attr('height', h + 'px')
        .attr('fill', 'none')
        .attr('stroke-width', '2px')
        .attr('stroke', 'blue')
    },
    // #endregion

    // #region bellow are Baidu face recognition
    async getAccessToken() {
      let _ = await this.$axios({
        method: 'post',
        url: '/api/face/getToken',
      }).then((res) => {
        console.log('get token:', res.data.data)
        this.token = res.data.data
      }).catch(error => {
        console.log(error)
      })
      return _
    },
    async getFaceDetect() {
      // let _=await this.getAccessToken()
      this.$axios.post(
        "/api/face/detect",
        Qs.stringify({ image: this.imgSrc.replace(/^data:image\/\w+;base64,/, "") })
      ).then((res) => {
        let obj = JSON.parse(res.data.data)
        if (obj.error_msg == 'SUCCESS') {
          console.log(obj.result)

        }
        // this.token=res.data
      }).catch(error => {
        console.log(error)
      })
    },
    async addFace(image, name) {
      // #region import image 
      // let _=await this.getAccessToken()
      let tmp = 'data:image/jpeg;base64,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'
      // #endregion
      await this.$axios.post(
        "/api/face/add",
        Qs.stringify({
          image: (image.length == 0 ? tmp : image).replace(/^data:image\/\w+;base64,/, ""),
          userName: name
        })
      ).then((res) => {
        let obj = JSON.parse(res.data.data)
        // console.log(obj)
        this.error_msg = obj.error_msg
        if (obj.error_code == '222018') {
          alert('用户名格式错误！必须为数字、字母、下划线的组合')
        }
        // let faceBox=obj.result.location
        // this.drawBindingBox(faceBox.left, faceBox.top, faceBox.width, faceBox.height, faceBox.rotation)
      }).catch(error => {
        alert(error)
        console.log(error)
      })
    },
    async deleteFace(log_id, name, face_token) {
      await this.$axios.post(
        "/api/face/delete",
        Qs.stringify({
          log_id: log_id,
          user_id: name,
          face_token: face_token
        })
      ).then((res) => {
        let obj = JSON.parse(res.data.data)
        // console.log(obj)
        this.error_msg = obj.error_msg
        // this.token=res.data
      }).catch(error => {
        console.log(error)
      })
    },
    async updateFace(image, userName) {
      this.$axios.post(
        "/api/face/update",
        Qs.stringify({
          image: image.replace(/^data:image\/\w+;base64,/, ""),
          userName: userName
        })
      ).then((res) => {
        let obj = JSON.parse(res.data.data)
        console.log(obj)
        if (obj.error_msg == 'SUCCESS') {
          console.log(obj.result)
        }
        console.log('this.faceSet:', this.faceSet)
        // this.token=res.data
      }).catch(error => {
        console.log(error)
      })
    },
    async searchFace(image) {
      if (image.length == 0) {
        this.$message({
          type: 'info',
          message: 'please choose a photo!'
        })
      }
      await this.$axios.post(
        "/api/face/search",
        Qs.stringify({
          image: image.replace(/^data:image\/\w+;base64,/, ""),
        })
      ).then((res) => {
        let obj = JSON.parse(res.data.data)
        // console.log(obj)
        if (obj.error_msg == 'SUCCESS') {
          let list = obj.result['user_list']
          // console.log(obj.result)
          this.predict_user = list[0].user_id
          this.predict_score = list[0].score
        }
        return obj.error_msg
      }).catch(error => {
        console.log(error)
        return null
      })
    },
    async getUsers() {
      this.user_id_list = []
      let _ = await this.$axios.post(
        "/api/face/allUserList"
      ).then((res) => {
        let obj = JSON.parse(res.data.data)
        this.log_id = obj.log_id
        // console.log('log1',this.log_id)
        if (obj.error_msg == 'SUCCESS') {
          let list = obj.result['user_id_list']
          // console.log('get:',list)
          for (var i = 0; i < list.length; i++) {
            this.user_id_list.push(list[i].toString())
          }
          // console.log('this.user_id_list',this.user_id_list)
          return list
        }
        return []
      })
    },
    async getFaceTokens(user_id) {
      this.face_token_list = []
      let _ = await this.$axios.post(
        "/api/face/allFaceList",
        Qs.stringify({
          user_id: user_id,
        })
      ).then((res) => {
        let obj = JSON.parse(res.data.data)
        // console.log(obj)
        if (obj.error_msg == 'SUCCESS') {
          let list = obj.result['face_list']
          for (var i = 0; i < list.length; i++) {
            this.face_token_list.push(list[i])
          }
          // console.log('this.face_list',this.face_token_list)
          return list
        }
        return []
      })
    }
    // #endregion
  }
};

