<template>
  <div>
    <div class="selector"> 
    <ul>
      <h2>&nbsp;Selecter</h2>
      &nbsp;<input type="text" value='enter'/><br/>
      <li
        v-for="(val, name, i) in nameList"
        :key="name"
        :value="val"
        :index="i"
        @click="refresh(name)"
      >
        &nbsp;<button>{{ val }}</button>
      </li><br/>

    </ul>
    </div>
      <div class="window" @mouseover="stop" @mouseleave="play">
        <ul class="container" :style="containerStyle">
          <li>
            <img
              :style="{ width: imgWidth + 'px' }"
              :src="sliders[sliders.length - 1].img"
              alt=""
            />
          </li>
          <li v-for="(item, index) in sliders" :key="index">
            <img :style="{ width: imgWidth + 'px' }" :src="item.img" alt="" />
          </li>
          <li>
            <img
              :style="{ width: imgWidth + 'px' }"
              :src="sliders[0].img"
              alt=""
            />
          </li>
        </ul>
        <ul class="direction">
          <li class="left" @click="move(600, 1, speed)">
            <svg
              class="icon"
              width="30px"
              height="30.00px"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#ffffff"
                d="M481.233 904c8.189 0 16.379-3.124 22.628-9.372 12.496-12.497 12.496-32.759 0-45.256L166.488 512l337.373-337.373c12.496-12.497 12.496-32.758 0-45.255-12.498-12.497-32.758-12.497-45.256 0l-360 360c-12.496 12.497-12.496 32.758 0 45.255l360 360c6.249 6.249 14.439 9.373 22.628 9.373z"
              />
            </svg>
          </li>
          <li class="right" @click="move(600, -1, speed)">
            <svg
              class="icon"
              width="30px"
              height="30.00px"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#ffffff"
                d="M557.179 904c-8.189 0-16.379-3.124-22.628-9.372-12.496-12.497-12.496-32.759 0-45.256L871.924 512 534.551 174.627c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0l360 360c12.496 12.497 12.496 32.758 0 45.255l-360 360c-6.249 6.249-14.439 9.373-22.628 9.373z"
              />
            </svg>
          </li>
        </ul>
        <ul class="dots">
          <li
            v-for="(dot, i) in sliders"
            :key="i"
            :class="{ dotted: i === currentIndex - 1 }"
            @click="jump(i + 1)"
          ></li>
        </ul>
      </div>
  </div>
</template>

<script src= './sliderScripts.js'>
</script>

<style  scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
ol,
ul {
  list-style: none;
}
.window {
  text-align: center;
  position: relative;
  top: -170px;
  width: 600px;
  height: 400px;
  margin: 0 auto;
  overflow: hidden;
}
.container {
  display: flex;
  position: absolute;
}
.left,
.right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  cursor: pointer;
}
.left {
  left: 3%;
  padding-left: 12px;
  padding-top: 10px;
}
.right {
  right: 3%;
  padding-right: 12px;
  padding-top: 10px;
}
img {
  user-select: none;
}
.dots {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}
.dots li {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin: 0 3px;
  border: 1px solid white;
  border-radius: 50%;
  background-color: #333;
  cursor: pointer;
}
.dots .dotted {
  background-color: rgb(142, 122, 84);
}
.selector {
  text-align: left;
  width: 100px;
  position: relative;
  top: 0;
  cursor: pointer;
}
</style>