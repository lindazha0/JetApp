<template>
  <!-- <div id=background> -->
  <div id='center'>
    <h1>Happy Birthday! Lottery Time!<br/>Please choose a gift!</h1>
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
  <!-- </div> -->


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
/* background: url("../assets/pika.png"); */
/* width:80%; */
position:fixed;
background-size:100% 100%;
}
</style>  