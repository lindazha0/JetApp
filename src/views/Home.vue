<template>
  <div class="home">
    <img alt="Linda logo" src="../assets/dollar.png" />
    <HelloWorld msg="Welcome to Linda's Jetson Nano App! 😊" />

    <!-- for birthday reminder -->
    <p type="text" @click="dialogVisible = true">
      让我看看今天过生日的人是谁(￣▽￣)"
    </p>
    <el-dialog title="Birthday Reminder" v-model="dialogVisible">
      <p>今日寿星：{{ birthName }} 生日快乐！<br />快提醒他去抽奖😍</p>
      <template #footer>
        <span class="dialog-footer">
          <router-link to="/face_reco">
            <el-button type="primary" @click="loginMessage">去抽奖</el-button>
          </router-link>
          <el-button @click="remindMessage">去提醒</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- for meal time reminder -->
    <el-dialog title="Birthday Reminder" v-model="mealReminderVisible">
      <p>该吃饭啦！！</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="closeEatReminder">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- for clock -->
    <el-button type="text" @click="playDateTime">报时</el-button>
    <audio ref="audioTip">
      <source src="../assets/audio/吃饭啦.mp3" />
      >
    </audio>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { ElMessage } from "element-plus";

export default {
  name: "Home",
  data() {
    return {
      timer: "",
      time: "",
      dialogVisible: false,
      mealReminderVisible: false,
    };
  },
  components: {
    HelloWorld,
  },
  mounted() {
    //播放吃饭
    this.timer = setInterval(this.checkTime, 30000);
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
    loginMessage() {
      this.dialogVisible = false;
      ElMessage({
        showClose: true,
        message: "Please log in first!",
      });
    },
    remindMessage() {
      this.dialogVisible = false;
      ElMessage({
        showClose: true,
        message: "快去告诉他这个好消息吧!",
      });
    },
    checkTime() {
      var now = new Date();
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();

      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }
      // set a clock
      if (hour == "11" && minute == "30") {
        this.eatReminder();
      }
      if (hour == "17" && minute == "30") {
        this.eatReminder();
      }
      this.time = hour + ":" + minute + ":" + second;
      // console.log(this.time);
      // this.voice(this.time);
      return this.time;
    },
    checkDate() {
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var date = now.getDate();

      if (month < 10) {
        month = "0" + month;
      }
      if (date < 10) {
        date = "0" + date;
      }
      let obj = year + "-" + month + "-" + date;

      return obj;
    },
    playDateTime() {
      let obj = `现在是${this.checkDate()} ${this.checkTime()}`;
      console.log(obj);

      this.voice(obj);
    },
    voice(text) {
      var url = `https://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=6&text=${encodeURI(
        text
      )}`;
      let voice = new Audio(url);
      // console.log(voice);
      voice.play();
      // new Audio('http://tts.baidu.com/text2audio?cuid=baiduid&lan=zh&ctp=1&pdt=311&tex=' + text).play();
      // let audio = new Audio();
      // audio.src = "../assets/audio/test.mp3";
      // console.log(audio);
      // audio.play();
    },
    playEat() {
      this.$refs.audioTip.play();
    },
    eatReminder() {
      this.mealReminderVisible = true;
      this.timer = setInterval(this.playEat, 2000);
    },
    closeEatReminder() {
      this.mealReminderVisible = false;
      clearInterval(this.timer);

      // delay
      clearTimeout(timer); //清除延迟执行
      var timer = setTimeout(() => {
        //设置延迟执行
        console.log("ok");
      }, 600000);

      timer = setInterval(this.checkTime, 30000);
    },
    play(source) {
      new Audio(source).play();
      // let audio = new Audio(;)
      // audio.play()
    },
  },
};
</script>
