<template>
  <div class="SongList">
  <!-- //用v-for循环渲染缩略图 -->
     <div class='covers'>
        <div  v-for="(img, _) in snacks" :key='img'>
          <img :style="{ width: '400px' }" :src="img.img" >
          <!-- {{img}} -->
        </div>
       </div>

  </div>
</template>

<style scoped>
    .SongList{
        width: 100%;
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
        /* border-radius: 10px; */
        /* cursor: zoom-in; */
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
        data:function() {
            return {
                ShowIndex:0,
                display: 'none',
                MinDisplay:'flex',
                // Vue模板中使用v-for循环渲染图片时不能直接使用图片文件本地位置
                snacks:[
                    {img: require("../assets/gift.png")},
                ]
            };
        },
        mounted(){
            this.initSnacks();
        },
        methods:{
            initSnacks() {
            var requireModule = require.context("../assets/snacks/", false, /\.jpg$/);
            
            this.snacks = [];
            for (var i = 0; i < requireModule.keys().length; i++) {
                this.snacks.push({
                    img: require("../assets/snacks/" + requireModule.keys()[i].substr(2, requireModule.keys()[i].length))
                });
            }
            console.log(this.snacks)
            },
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
