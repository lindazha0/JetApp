<template>
  <div class="SongList">
  <!-- //用v-for循环渲染缩略图 -->
     <div class="covers" >
        <div class="cover" v-for="(img,index) in imgs" :key='img'>
          <img :src="img.src" width="90%" class="min" @click="ZoomIn(index)" alt="">
        </div>
       </div>
  <!-- //渲染放大后的图 -->
       <div class="max" >
            <div @click="ZoomOut"  v-for="(img,index) in imgs" :key='img' :class="[index===ShowIndex?'active':'None']" ><img :src="img.src" width="100%"></div>
            <!-- //放大后图片下方的导航图 -->
            <div class="small">
                <div :class="[{'smallActive':index===ShowIndex},'cover-small']" v-for="(img,index) in imgs" :key='img' @click="select(index)" ><img :src="img.src" width="90%"></div>
            </div>
        </div>
  </div>
</template>

<style scoped>
    .SongList{
        width: 40%;
    }
    .covers{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .cover{
        display: flex;
        justify-content: center;
        width: 33%;
        margin: 10px 0;
    }
    .min{
        border-radius: 10px;
        cursor: zoom-in;
    }
    .max{
        cursor: zoom-out;
        width: 100%;

    }
    .small{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .cover-small{
        display: flex;
        justify-content: center;
        width: 10%;
        margin: 10px 0;
        opacity: 0.6;
        cursor: pointer;
    }
    .cover-small:hover{
        opacity: 1;
    }
    .active{
        display: flex;
    }
    .None{
        display: none;
    }
    .smallActive{
        opacity: 1;
    }

</style>

<script>
    export default {
        name: "SongList",
        data:function() {
            return {
                ShowIndex:0,
                display: 'none',
                MinDisplay:'flex',
                // Vue模板中使用v-for循环渲染图片时不能直接使用图片文件本地位置
                imgs:[
                    {"src":require("../assets/gift.png")},
                    {"src":require("../assets/gift.png")},
                    {"src":require("../assets/gift.png")},
                    {"src":require("../assets/gift.png")},
                    {"src":require("../assets/gift.png")},
                    {"src":require("../assets/gift.png")},
                    {"src":require("../assets/gift.png")},
                    {"src":require("../assets/gift.png")},
                    {"src":require("../assets/gift.png")},
                   
                ]

            };
        },
        methods:{
            ZoomIn(i){
               this.display='block';
                this.MinDisplay='none';
                this.ShowIndex=i;
            },
            ZoomOut(){
                this.display='none';
                this.MinDisplay='flex';
            },
            select(i){
                this.ShowIndex=i;


            }
        }
    }
</Script>
