<template>
  <div class="about">
    <h1>This is an new page</h1>
    <input id="button" value="自动播放" type="button" v-on:click="run()" />
    <input id="button" value="暂停播放" type="button" v-on:click="stop()" />
    <input id="button" value="上一个" type="button" v-on:click="last()" />
    <input id="button" value="下一个" type="button" v-on:click="cycle()" />
    <br />
    <img
      id="banner"
      alt="banner"
      src="../assets/img/1.jpg"
      width="200"
    />
    <br />
  </div>
</template>

<script>
export default {
  name: "ShowImage",
  components: {},
  data: function () {
    return {
      img: require("../assets/img/1.jpg"),
      banners: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"], // 图片地址
      counter: "0",
      int: "",
    };
  },
  mounted() {},
  methods: {
    run: function () {
      this.int = setInterval("cycle()", 1000); //重复运行cycle函数，周期1000ms
    },
    stop: function () {
      this.int = window.clearInterval(this.int);
    },
    cycle: function () {
      this.counter++;
      if (this.counter == this.banners.length) this.counter = 0;
      document.getElementById("banner").src =
        "../assets/img/" + this.banners[this.counter];
      console.log(document.getElementById("banner").src)
    },
    last: function () {
      this.counter--;
      if (this.counter == -1) this.counter = this.banners.length - 1;
      document.getElementById("banner").src =
        "../assets/img/" + this.banners[this.counter];
    },
  },
};
</script>