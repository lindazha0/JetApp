<template>
	<div class="speechVoice-container" style="width:100%;height:100%;">
        <div class="model-dialog">
            <el-dialog
                v-model="dialogVisible"
                width="400px"
                :modal="isDialogModel"
                append-to-body="true"
                class="voice-dialog"
                @opened="handleDialogOpened"
                @closed="handleDialogColsed"
            >
                <div slot="title" class="dialog-title">
                    <span class="el-icon-warning"></span>
                    <span>{{dialogTitle}}</span>
                </div>
                <div class="letter-content">{{curLetter}}</div>
                <div class="voice-status-img">
                    <img :src="videoImgSrc" />
                </div>
                
                <div class="oper-btn">
                    <img :src="operImgSrc" @click="handlePlayControl"/>
                </div>
            </el-dialog>
        </div>

	</div>
</template>

<script>
export default {
    props: {
        speechVoiceList: {
            type: Array,
            default: () => ([])
        },
    },
    data() {
        return {
           dialogTitle : '预警信息',
           dialogVisible : true,
           isDialogModel : false,
           //letterList : ['第一段文字','第二段文字','第三段文字','第四段文字'],
           speechInstance : null,
           curLetter : '',
           letterIndex : 0,
           timer : null,
           videoImgSrc : '',
           operImgSrc : '',
           isPlay : true,
           playEnd : false
        };
    },
    mounted() {
        this.speechInstance = new SpeechSynthesisUtterance();
        window.speechSynthesis.cancel();
        this.videoImgSrc =  `${this.$base.path.nodeStaticResourcesHost}/images/voiceStart.gif`;
        this.operImgSrc = `${this.$base.path.nodeStaticResourcesHost}/images/stop.png`;
        this.voicePlay();
    },
    methods: {
        voicePlay(){
            if(this.letterIndex < this.speechVoiceList.length){
                this.play(this.speechVoiceList[this.letterIndex]);
            }else{
                this.playEnd = true;
                this.clearData();
                this.$emit('speechVoiceEnd');
            }
        },
        play(item){
            this.curLetter = item;
            this.timer = null;
            this.speechInstance.text = item;
            this.speechInstance.lang = 'zh-CN';
            this.speechInstance.volume = 3;
            this.speechInstance.rate = 1;

            window.speechSynthesis.speak(this.speechInstance);

            let _this = this;
            this.speechInstance.onend = ()=>{ 
                window.speechSynthesis.cancel();
                _this.letterIndex++;
                
                _this.timer = setTimeout(() => {
                    this.voicePlay();
                },1000);
            };
        },
        handlePlayControl(){
            if(this.isPlay){
                window.speechSynthesis.pause();
                this.videoImgSrc =  `${this.$base.path.nodeStaticResourcesHost}/images/voiceStop.png`;
                this.operImgSrc = `${this.$base.path.nodeStaticResourcesHost}/images/start.png`;
                this.isPlay = false;
            }else{
                if(this.playEnd){
                    this.voicePlay();
                }else{
                    window.speechSynthesis.resume();
                }
               
                this.videoImgSrc =  `${this.$base.path.nodeStaticResourcesHost}/images/voiceStart.gif`;
                this.operImgSrc = `${this.$base.path.nodeStaticResourcesHost}/images/stop.png`;
                this.isPlay = true;
            }
        },
        clearData(){
            this.letterIndex = 0;
            this.isPlay = false;
            this.videoImgSrc =  `${this.$base.path.nodeStaticResourcesHost}/images/voiceStop.png`;
            this.operImgSrc = `${this.$base.path.nodeStaticResourcesHost}/images/start.png`;
        },
        handleDialogColsed(){
            window.speechSynthesis.cancel();
            this.speechVoiceList = [];
            this.letterIndex = 0;
            this.voicePlay();
        }
    },
    
};
</script>

<style lang="css">
    .voice-dialog{
        position: fixed !important;
        top: inherit !important;
        right: 20px !important;
        bottom: 0px !important;
        left: inherit !important;

        .el-dialog{
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow:0px 0px 5px #d3d6da;
            margin-bottom : 20px !important;
        }
        .dialog-title{
            & > span:first-child{
              color : #faad14;
              margin-right : 5px;
              font-size : 18px;
           }

            & > span:last-child{
                font-size : 18px;
                color : #000;
            }
       }

       .letter-content{
           border : 1px solid #ebebeb;
           padding : 15px 25px;
           margin-top : -20px;
       }
       
       .voice-status-img{
           margin-top:10px;
       }

       img{
           margin : 0px auto;
           display : block;
       }

       .oper-btn{
           margin : 20px auto 0px;
           text-align : center;
       }
    }
</style>

