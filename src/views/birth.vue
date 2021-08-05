<template>
  <div id='center'>
    <h1>Happy Birthday! Lottory Time!<br/>Please choose a gift!</h1>
  <div class="sudoku_row">
    <div
      class="sudoku_item"
      :class="curSelect != lot.id ? 'opacity' : null"
      v-for="(lot, index) in imgs"
      :key="index"
      @click="selectGift(index)"
    >
      <img :src="gift" width="90"  style="border-radius:20px"/>
      <!-- {{ sudoku.name }} -->
    </div>
    <br/>
    <button @click="submit">Submit</button>
  </div>
  </div>


</template>  

<script>
export default {
  name: "sudoku",
  data() {
    return {
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
  methods: {
    selectGift (e) {
      var that = this;
      that.curSelect = e;
    },
    submit(){
      if(this.curSelect==null) 
        alert("You haven't choose a gift!")
      else{
        var sub = confirm("Are you sure?\nYou have only one choice!")
        console.log(sub)
        if (sub){
          const rand = parseInt(Math.random() * 7 + 1);
          const msg = "You got gift"+ rand
            +", "+ this.imgs[rand].name+
            ",\nHappy Birthday!😀";
          alert(msg);
        }
      }
        

    }
  },
};
</script>  

<style >
#center {
  text-align: center;
}
.sudoku_row {
  text-align: center;
  position: relative;
  display: flex;
  width: 30%;
  margin: auto;
  justify-content: center;
  flex-wrap: wrap;
}
.sudoku_item {
  position: relative;
  display: flex;
  justify-content: center;
  border-radius:20px;
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
}
#background{
/* background:url("https://tse1-mm.cn.bing.net/th/id/R-C.33674725d9ae34f86e3835ae30b20afe?rik=Pb3C9e5%2b%2b3a9Vw&riu=http%3a%2f%2fwww.desktx.com%2fd%2ffile%2fwallpaper%2fscenery%2f20180626%2f4c8157d07c14a30fd76f9bc110b1314e.jpg&ehk=9tpmnrrRNi0eBGq3CnhwvuU8PPmKuy1Yma0zL%2ba14T0%3d&risl=&pid=ImgRaw&r=0"); */
/* background: url("../assets/gift.png"); */
width:100%;
height:100%;
position:fixed;
background-size:100% 100%;
}
</style>  