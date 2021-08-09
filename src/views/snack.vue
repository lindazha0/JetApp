<template>
  <div class="SongList">
  <!-- //用v-for循环渲染缩略图 -->
     <div class='covers'  :style="{display:MinDisplay}">
        <div class='cover' v-for="(img, index) in snacks" :key='img'>
          <img :style="{ width: '90%' }" :src="img.img" class='min' @click="ZoomIn(index)" alt=''>
        </div>
       </div>
       <div :style="{display:display}">
           <div class="small">
               <div :class="{'smallActive':index===ShowIndex}" v-for="(img, index) in snacks" :key='img' @click="select(index)">
                   <img :src="img.img" class='cover-small' >
               </div>
           </div>
           <br/>
           <div @click="ZoomOut" v-for="(img, index) in snacks" :key='img' :class="[index===ShowIndex?'active': 'None']">
               <img :src="img.img" class="max">
           </div>
       </div>

  </div>
</template>

<style scoped>
    .SongList{
        display: inline;
        width: 80%;
        border-radius: 10px;

    }
    .covers{
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .cover{
        object-fit:cover;
        /* display: flex; */
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
        border-radius: 10px;
        width: 90%;
    }
    .small{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        
    }
    .cover-small{
        display: flex;
        justify-content: center;
        opacity: 0.6;
        cursor: pointer;
        width: 100px;
        height: 100px;
    }
    .cover-small:hover{
        opacity: 1;
    }
    .active{
        display: center;
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
