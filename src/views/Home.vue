<template>
  <div class="home">
    <img alt="Linda logo" src="../assets/dollar.png" />
    <HelloWorld msg="Welcome to Linda's Jetson Nano App! 😊" />
    <el-button type="text" @click="open"
      >让我看看今天过生日的人是谁(￣▽￣)"</el-button
    >
    <el-button type="text" @click="addDate">查看日期</el-button>
    <audio ref='audioTip' >
      <source src="../assets/audio/吃饭啦.mp3">
    ></audio>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
// import {getCurrentInstance, onMounted} from 'vue'

export default {
  name: "Home",
  data() {
    return {
      timer: "",
      time: "",
      dialogVisible: false,
    };
  },
  components: {
    HelloWorld,
  },
  mounted() {
    //播放吃饭
    // this.timer = setInterval(this.eat, 3000);


    // console.log(this.birthName)
    // if (!this.birthLottery) {
    //   alert("Today is" + this.birthName + "'s Birthday!!");
    //   this.birthName = "大面包";
    //   this.birthLottery=true;
    // }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    open() {
      this.$confirm(
        `今日寿星：${this.birthName}
            生日快乐！\n快提醒他去抽奖😍`,
        "生日提醒",
        {
          confirmButtonText: "去提醒",
          cancelButtonText: "去抽奖",
          type: "success",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "快去哟!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    addDate() {
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var date = now.getDate();
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();
      if (month < 10) {
        month = "0" + month;
      }
      if (date < 10) {
        date = "0" + date;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }
      let obj = year + "-" + month + "-" + date + " " + hour + ":" + minute;
      this.time = hour + ":" + minute;
      this.voice(obj);
      console.log(this.time);

      return obj;
    },
    voice(text) {
      var url =
        "https://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=6&text=" +
        encodeURI('现在是'+text);
      let voice = new Audio(url)
      console.log(voice)
      voice.play();
      // new Audio('http://tts.baidu.com/text2audio?cuid=baiduid&lan=zh&ctp=1&pdt=311&tex=' + text).play();
      // let audio = new Audio();
      // audio.src = "../assets/audio/test.mp3";
      // console.log(audio);
      // audio.play();
    },
    updateTime(){
      var time = this.addDate()
    },
    eat(){
      this.$refs.audioTip.play();
    },
    play(source) {
      new Audio(source).play();
      // let audio = new Audio(;)
      // audio.play()
    },
  },
};
</script>
