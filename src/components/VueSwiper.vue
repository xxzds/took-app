<template>
  <div class="container">
    <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
      <!-- slides -->
      <swiper-slide v-for="(item,index) in itemImg" :key="index" style="width:100%">
        <img width="100%" :src="item.imgSrc"/>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
      <!--<div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
    </swiper>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'carrousel',
  props: {
    itemImg: Array
  },
  data () {
    return {
       indexColumn:2,
       swiperOption: {
         //默认初始显示页
          initialSlide:0,
          // slidesPerView :2,
          //设置可滑动方向，默认水平
          direction:'horizontal',
          //切换时间
          speed:2000,
          grabCursor:true,
          loop:true,
          // effect:'flip',
          autoplay:{
            delay:200,
            stopOnLastSlide:false,//切换到最后一个停止，当为true
            reverseDirection:false,//反向切换
            waitForTransition:true
          },
          pagination: {
            el: '.swiper-pagination',
          },
          on:{
               slideChange: function () {
              },
          },
          centeredSlides:true
        },
        // itemImg:[]
    }
  },
  computed:{
     swiper() {
        return this.$refs.mySwiper.swiper
      }
  },
  created(){
    this.$nextTick(function(){
      //获取轮播图片
      //this.getItemImg();
    })
  },
  methods:{
    callback:function(){

    },
    getItemImg:function(){
     //Vue.source插件，目前已经被axios代替
		  this.$http.get('http://localhost:8080/getItemImg').then(response => {
        this.itemImg = response.data.data; 
		  }, response => {
		    
		  });
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-wrapper{
 transition-timing-function:  ease-in-out  ;
 .swiper-slide{
   width:100%;
    // color: #fff;
    // height: 400px;
    // display:table;
    // vertical-align: middle;
    // &:nth-of-type(odd){
    //   background-color: green;
    // }
    // &:nth-of-type(even){
    //   background-color: red;
    // }
    span{
      display:table-cell;
      vertical-align: middle;
    }
  }
 }
</style>
