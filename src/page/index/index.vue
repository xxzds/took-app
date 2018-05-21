<template>
  <transition name="slideIn" mode="in-out">
    <div id="index">
       <head-bar></head-bar>
       <div class="appcontent">
          <app-container></app-container>
       </div>
      <!-- 底部导航 -->
      <nav-bar></nav-bar>
    </div>
  </transition>
</template>

<script>
import appContainer from './container'
import navBar from './navBar'
import headBar from '../../components/headBar';

export default {
  name: 'firstpage',
  components: { navBar ,headBar ,appContainer},
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#index{
 text-align: center;
 .appcontent{
   padding-top:70px;
 }
}
</style>
