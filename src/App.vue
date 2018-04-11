<template>
  <div id="app">
    <transition :name="transitionName">
          <router-view class="child-view"/>
    </transition>
    <!--回到顶部-->
      <div class="backTop" @click="gotop">
          <div class="go-top top-button-hide">
              <span>顶部</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      transitionName: 'slide-right',
      flag:true
    }
  },
  computed:{

  },
  watch:{
    $route(val){

    }
  },
  created(){
     this.$nextTick(function(){
      //获取轮播图片
     // this.getItemImg();
      this.scrollEvent();
      window.addEventListener("touchmove",this.scrollEvent );
    })
  },
  methods:{
    gotop:function(){
      setTimeout(function(){
        $("html,body").animate({scrollTop:$("body").offset().top},300);
      }, 500);
        $(".go-top").addClass("top-button-hide").removeClass("top-button-show");
      },
    scrollEvent:function(){
      var scrollTop = window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop| 0
      if (scrollTop > 200) {
         $(".go-top").removeClass("top-button-hide").addClass("top-button-show");
      } else {
         $(".go-top").addClass("top-button-hide").removeClass("top-button-show");
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
        let isBack = this.$router.isBack
        if (isBack) {
            this.transitionName = 'slide-right'
        } else {
            this.transitionName = 'slide-left'
        }
        this.$router.isBack = false
        next()
    }
}
</script>

<style lang="less">
input{outline:none} 
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: .4rem;
  margin: 0 auto;
  // max-width:640px;
  height: 100%;
  .child-view{
      font-size: .4rem;
      height: 100%;
  }
}
.go-top {
    display: block;
    width: 42px;
    height: 42px;
    position: fixed;
    right: 20px;
    bottom: 64px;
    z-index: 10000;
    background-image: url('./assets/icon/go_top.png');
    background-size: contain;
    opacity: 0;
    transition: bottom .8s ease, opacity .6s ease;
}
.top-button-show {
    bottom: 64px;
    opacity: 1;
}
.top-button-hide {
    bottom: -64px;
    opacity: 0;
}
.go-top span {
    position: absolute;
    bottom: 9px;
    width: 100%;
    display: block;
    height: 12px;
    line-height: 12px;
    text-align: center;
    font-size: 12px;
    color: #333;
}
</style>
