<template>
  <!-- <div id=background> -->
  <div id="center">
    <h1>Happy Birthday! Lottery Time!<br />Please choose a gift!</h1>
    <el-button type="warning" plain icon="el-icon-magic-stick" @click="submit" style='{border-radius: 20px;}'
      >Submit</el-button
    >
    <br />
    <div class="sudoku_row">
      <div
        class="sudoku_item"
        :class="curSelect != lot.id ? 'opacity' : null"
        v-for="(lot, index) in imgs"
        :key="index"
        @click="selectGift(index)"
      >
        <img :src="gift" width="90" style="border-radius: 20px" />
        <!-- {{ sudoku.name }} -->
      </div>
    </div>

    <!-- interaction -->
    <el-dialog title="Birthday Reminder" v-model="dialogVisible">
      <p>今日寿星：{{birthName}}
            生日快乐！<br/>快提醒他去抽奖😍</p>
      <template #footer>
        <span class="dialog-footer">
          <router-link to="/face_reco">
          <el-button type="primary" @click="loginMessage"
            >去抽奖</el-button
          >
          </router-link>
          <router-link to='/'>
          <el-button @click="remindMessage">去提醒</el-button>
          </router-link>
        </span>
      </template>
    </el-dialog>
  </div>
  <!-- </div> -->
</template>  

<script>
import { ElMessage } from "element-plus";
export default {
  name: "sudoku",
  data() {
    return {
      dialogVisible: true,
      gift: require("../assets/gift.png"),
      imgs: [
        {
          id: 0,
          name: "鼠标",
        },
        {
          id: 1,
          name: "steam游戏",
        },
        {
          id: 2,
          name: "qq音乐会员",
        },
        {
          id: 3,
          name: "带薪休假一天",
        },
        {
          id: 4,
          name: "两张电影票",
        },
        {
          id: 5,
          name: "按摩枕",
        },
        {
          id: 6,
          name: "ipad",
        },
        {
          id: 7,
          name: "iphone",
        },
        {
          id: 8,
          name: "蛋糕",
        },
      ],
      curSelect: null,
    };
  },
  components: {},
  mounted() {
  },
  methods: {
    // dialog message part
    loginMessage(){
      this.dialogVisible = false;
      ElMessage({
        showClose: true,
        message: 'Please log in first!'
      })
    },
    remindMessage(){
      this.dialogVisible = false;
      ElMessage({
        showClose: true,
        message: '快去告诉他这个好消息吧!'
      })
    },
    // lottery part
    selectGift(e) {
      var that = this;
      that.curSelect = e;
    },
    submit() {
      if (this.curSelect == null) alert("You haven't choose a gift!");
      else {
        var sub = confirm("Are you sure?\nYou have only one choice!");
        console.log(sub);
        if (sub) {
          const rand = parseInt(Math.random() * 7 + 1);
          const msg =
            "You got gift" +
            rand +
            ", " +
            this.imgs[rand].name +
            ",\nHappy Birthday!😀";
          alert(msg);
        }
      }
    },
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
            showClose: true,
            type: "success",
            message: "快去哟!",
          });
        })
        .catch(() => {
          this.$message({
            showClose: true,
            type: "info",
            message: "选中后点击Submit抽奖",
          });
        });
    }
  },
};
</script>  

<style scoped>
h1 {
  color: #2c3e50;
  -webkit-text-stroke: 0.5px aliceblue;
}

#center {
  text-align: center;
  background: url("../assets/pika.png");
}
.sudoku_row {
  text-align: center;
  position: relative;
  display: flex;
  width: 300px;
  margin: auto;
  justify-content: center;
  flex-wrap: wrap;
}
.sudoku_item {
  position: relative;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  width: 33%;
  padding-top: 5px;
  padding-bottom: 5px;
  background: #adb49a;
}
.opacity {
  opacity: 0.5;
}
.sudoku_item img {
  margin-bottom: 5px;
  cursor: pointer;
}
#background {
  /* background: url("../assets/pika.png"); */
  /* width:80%; */
  position: fixed;
  background-size: 100% 100%;
}
</style>  