<template>
    <div class="custom-video-outer-box" @mouseover="videoMouseOver">
      <video-player  class="video-player-box"
                 ref="videoPlayer"
                 :options="playerOptions"
                 :playsinline="true"
                 customEventName="customstatechangedeventname"
                 @play="onPlayerPlay($event)"
                 @pause="onPlayerPause($event)"
                 @ended="onPlayerEnded($event)"
                 @waiting="onPlayerWaiting($event)"
                 @playing="onPlayerPlaying($event)"
                 @loadeddata="onPlayerLoadeddata($event)"   
                 @timeupdate="onPlayerTimeupdate($event)"
                 @statechanged="playerStateChanged($event)"
                 @ready="playerReadied"
                 >
                 
                  <!-- @canplay="onPlayerCanplay($event)" -->
                   <!-- @canplaythrough="onPlayerCanplaythrough($event)" -->
                
       </video-player>
       <!-- 底部进度条 start -->
         <transition name="fade">
                <div class="bottomCtrl" v-show="isBottomCtrlShow" id="bottomCtrl">
                    <!-- <div class="bottomCtrl" v-show="false"> -->
                <!-- <div class="bottomCtrl"  > -->
                    
                    <Slider v-model="playerCtrl.currentTimeInt" class="progress-slider" :max="playerCtrl.durationInt" :tip-format="progressTipFormat" @on-change="progressChange"></Slider>
                    <div class="clearfix" >
                        <div class="left">
                                <!-- 暂停 -->
                                <span v-on:click="play" v-if="!playerCtrl.isPlay" class="icon">
                                    <Icon type="play"></Icon>
                                </span>
                                <!-- 播放 -->
                                <span v-else v-on:click="pause" class="icon">
                                     <Icon type="stop"></Icon>
                                </span>
                               
                                <!-- 下一曲 -->
                                <span class="icon" v-on:click="nextClick">
                                    <Icon type="skip-forward"></Icon>
                                </span>
                          
                            <span class="time">
                                {{playerCtrl.currentTime}}/{{playerCtrl.duration}}
                            </span>
                        </div>
                        <div class="right clearfix">
                                <div class="voice-box clearfix left"> 
                                    <!-- 音量 -->
                                    <Icon type="volume-medium" class="left icon"></Icon>
                                    <Slider v-model="playerCtrl.voiceSlider" class="voice-slider left " max=100 @on-change="volumeChange"></Slider>
                                </div>
                                 <!-- 全屏 -->
                                 <span class="icon left" @click="fullScreenHandle">
                                    <Icon type="crop" class="full-screen" ></Icon>
                                 </span>
                        </div>
                    </div>
                </div>
         </transition>
       </div>
  </template>

<script>
    
    require('video.js/dist/video-js.css');
    require('vue-video-player/src/custom-theme.css');
    import timeUtil from "@/utils/timeUtil.js";
    import { videoPlayer } from 'vue-video-player'

    export default {
        name: 'two',
        props:["sources"],
        components:{
            videoPlayer
        },
        data() {
            return {
                playerOptions: {
                muted: true,
                language: 'zh-CN',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                // fluid: true,
                
                controls:false,
                height:"100%",
                width:"100%", 
                preload:true,  
                sources: [{
                    type: "video/mp4",
                    src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                  }
                ],
                poster: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1511968791&di=7f921d2028da9c0a6fc173d39c6bdf61&src=http://ww2.sinaimg.cn/bmiddle/de86bbe0gw1ey9ft0lrzxj20c806m75a.jpg",
                },
                playerCtrl:{
                    isPlay:false,
                    isEnd:false,
                    durationInt:0,
                    currentTimeInt:0,
                    duration:0,
                    currentTime:0,
                    volume:0.5,//音量控制
                    voiceSlider:50,//声音控制
                    isFullScreen:false
                },
                isBottomCtrlShow:false,
            }
        },
         mounted() {
            console.log('this is current player instance object', this.player)
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            }
        },
        methods: {
            //底部控制条显示控制
            isBottomShowCtrl(){
                var _this=this;
                this.isBottomCtrlShow=true;
                setTimeout(function(){
                     _this.isBottomCtrlShow=false;
                },5000);

            },
            videoMouseOver(){
                this.isBottomShowCtrl();
            },
            //播放
            onPlayerPlay(player) {
                 this.playerCtrl.isPlay=true;
                 player.volume(this.playerCtrl.volume);
                 this.$emit('custom-vedio-say',true);
                this.isBottomShowCtrl();
            },
            // 暂停
            onPlayerPause(player) {
                this.playerCtrl.isPlay=false;
                this.$emit('custom-vedio-say',false);
            },
            //播放结束
            onPlayerEnded(player){
                this.playerCtrl.isEnd=false;
                this.$emit('custom-vedio-say',false);
            },
            //正在播放
            onPlayerPlaying(player){

            },
            onPlayerWaiting(player){
            },
            //加载数据
            onPlayerLoadeddata(player){
                this.playerCtrl.durationInt=Math.floor(player.duration());
                this.playerCtrl.duration=timeUtil.secondToDate(player.duration());
            },
            //时间更新  
            onPlayerTimeupdate(player){
                this.playerCtrl.currentTime=timeUtil.secondToDate(player.currentTime());
                this.playerCtrl.currentTimeInt=Math.floor(player.currentTime());
            },
            //状态改变
            playerStateChanged(playerCurrentState) {
                console.log("状态改变");
            },
            playerReadied(player) {
                console.log('the player is readied', player);
                
                
            },
            next(src){
                 console.log("--",this.player.el()); 
                
                this.player.addChild(document.getElementById("bottomCtrl"));
                let player=this.player;
                if(!player.paused())
                    player.pause();
                player.src(src);
                player.load();
                player.play();
            },
            // 自定义控制栏
            // 播放
            play(){
                this.player.play();
            },
            // 暂停
            pause(){
                 this.player.pause();
            },
            //下一曲
            nextClick(){
                console.log("自定义","下一曲点击");
               
            },
            //全屏
            fullScreenHandle(){
                console.log("全屏");
                if(!this.player.isFullscreen()){
                    this.player.requestFullscreen();
                    this.player.isFullscreen(true);
                }else{
                     this.player.exitFullscreen();
                     this.player.isFullscreen(false);
                }
            },
            //进度条提示控制
            progressTipFormat(val){
                return timeUtil.secondToDate(val);
                
            },
            //进度条被拉动
            progressChange(val){
                this.player.currentTime(val);
                this.playerCtrl.currentTimeInt=val;
                this.playerCtrl.currentTime=timeUtil.secondToDate(val);
                // console.log("进度条被拉动",val);
            },
            // 音量被拉动
            volumeChange(val){
                this.player.volume(val/100);
                console.log("当前音量",this.player.volume());
            }
        },
        
    }
</script>


<style lang="less">
    .video-player-box{
        height: 100% !important;
        width: 100% !important;
    }
    //底部进度条
    .bottomCtrl{
        line-height: 60px;
        height: 60px;
        overflow: visible;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: rgba(45, 45, 45, .92);
        width: 100%;
        padding: 0 50px;
        color: #fff;
        z-index: 999999999999999;

        .icon{
            font-size: 16px;
            line-height: 60px;
            cursor: pointer;
        }

        .icon+.icon{
            margin-left: 20px;
        }
    }
    .custom-video-outer-box{
        position: relative;
        height: 100%;
        width: 100%;
    }
    .progress-slider{
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        height: 18px;
        line-height: 18px;
        .ivu-slider-wrap{
            margin: 0 !important;
            border-radius: 0 !important;
        }
        .ivu-slider-button-wrap{
             line-height: normal !important;
        }
        .ivu-slider-button{
            height: 8px !important;
            width: 8px !important;
           
        }
    }
    .voice-box{
        .voice-slider{
            width: 100px;
            margin-left: 20px;
        }
        .ivu-slider-wrap{
            margin: 27px 0 !important;
        }

    }
    .time{
        margin-left: 25px;
    }
    .full-screen{
       margin-left: 25px;
        line-height: 60px;
    }
  
    .ivu-progress-outer{
        padding: 0 10px !important;
    }
    
    .vjs-big-play-button{
        height: 80px !important;
        width: 80px !important;
        line-height: 80px !important;
        text-align: center;
        background:rgba(0, 0, 0, 0.8) !important;
        border-radius: 50% !important;
        top: 50% !important;
        left: 50% !important;
        margin-left: -40px !important;
        margin-top: -40px !important;
    }
    #vjs_video_3{
        max-height: 100% !important;
        width: 100% !important;
        height: 100% !important;
    }
    .video-player-box>div{
        height: 100% !important;
        width: 100% !important;
    }
    .video-js .vjs-big-play-button{
        font-size: 5em !important;
    }
    video{
        max-height: 100% !important;

    }
   
</style>

