<template>
    <div id="play">
        <!-- 头部 start -->
      <div class="header clearfix">
          <h1 class="title left">一分不浪费的志愿是好志愿吗</h1>
          <ul class="clearfix right">
              <li class="left"> <a href="#">帮助</a></li>
              <li class="left"> <a href="/personal.html">个人中心</a></li>
          </ul>
      </div>
      <!-- 头部 end -->
      <div class="content clearfix"  id="content">
          <!-- 右侧课程目录 start -->
          <div class="right info-box " >
              <div class="info-con box-shadow" :class="isShow?'toShow':'toHide'">
                  <div class="inner-box">
                    <div class="nav">
                    课程目录
                    </div>
                    <div class="con">
                        <h2>小学语文作文技巧提升30法</h2>
                        <ul>
                            <li class="clearfix " :class="playerListCurrentIndex==index?'selected':''" v-for="(item,index) in [0,0,0,0,0,0]" @click="playerListClick(index)">
                                <Row>
                                    <Col span="20" class="clearfix title-box ">
                                        <Icon type="film-marker icon left"></Icon>
                                        <h3 class="left title">01-改出画面感</h3>
                                    </Col>
                                    <Col span="4">
                                        <p class="dur-time ">00:45:00</p>
                                    </Col>
                                </Row>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- 收缩手柄 start -->
                <div class="handle"  @click="isShow=!isShow">
                    <Icon type="ios-arrow-right" class="icon" :class="isShow?'toright':'toleft'"></Icon>
                </div>
                <!-- 收缩手柄 end -->
              </div>
              
          </div>
          <!-- 右侧课程目录 end -->
          <!-- 播放器 start -->
          <div class="player-box box-shadow" :class="isShow?'toLeft':'toRight'"  @mouseover="videoMouseOver">
              <custom-vedio ref="customVedio" v-on:child-video-listen="videoListen"></custom-vedio>
          </div>
          <!-- 播放器 end -->
      </div>
    </div>
  </template>

<script>
    import CustomVedio from "./components/CostomVedio.vue";
    import "@/style/play.less";

    export default {
        name: 'play',
        components:{
            CustomVedio
        },
        data() {
            return {
                playerListCurrentIndex:0,//当前播放位置
                isShow:true,//侧边栏是否显示
                isBottomCtrlShow:false,//底部控制栏是否显示
            }
        },
        mounted(){
            // window.innerHeight
            //  var wh = document.documentElement.clientHeight; 
             var wh = window.innerHeight; 
             var top = 80;
             var ch = (wh - top) + "px";
             document.getElementById( "content" ).style.height = ch;
        },
        methods:{
            //监听子组件，播放器传过来的数据
            videoListen(data){
                console.log("data",data);
            },
            //播放列表点击
            playerListClick(index){
                this.playerListCurrentIndex=index;
                this.next();
            },
            //鼠标移到视频上方，控制出现，隔5s之后消失
            videoMouseOver(){
                this.isBottomCtrlShow=true;
                var _this=this;
                setTimeout(function(){
                     _this.isBottomCtrlShow=false;
                },3000);
            },
            //播放下一个视频
            next(){
                this.$refs.customVedio.next([
                     { 
                         type: "video/mp4",
                         src: 'http://vjs.zencdn.net/v/oceans.mp4'
                     }
                ]);
            }
        }
    }
</script>