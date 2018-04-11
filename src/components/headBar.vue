<template>
    <div id="headerBar">
        <router-link to="/" class="name">促优网</router-link>
        <div class="item" @click="search">
            <img src="@/assets/icon/search.png"/>
            {{hot_topic}}
        </div>
        <a @click="sort" href="#">
            <img src="@/assets/icon/sort.png" />
            <div>
              分类
            </div>
        </a>
    </div>
</template>
<script>
export default {
    name: 'headerBar',
    data () {
        return {
           hot_topic: '搜你想搜的',
        }
    },
    watch: {
        $route (val) {
        }
    },
    methods: {
        search:function(){
            this.$router.push({name:'searchpage'})
        },
        sort:function(){
          this.$router.push({name: 'itemCates'})
        },
    }
}
</script>
<style lang='less'>
#headerBar{
  position: fixed;
  top:0;
  left:0;
  right:0;
  z-index: 9999;
  padding:.2rem .4rem;
  display: flex;
  background: linear-gradient(#FF3D6F,#FF5BA6);
  text-justify: center;
  align-items: center;
  a{
      color: #fff;
      &:first-child{
          font-weight: bold;
          font-size: 120%;
         word-spacing: 2px;
      }
      &:last-child{
          text-align: center;
          font-size: 40%;
          img{
              width:.45rem;
          }
      }
   }
  div.item{
      flex: 1;
      background-color: #fff;
      padding: 4px .2rem;
      border-radius: 5px;
      color: #666;
      font-size: 100%;
      margin: 0 .4rem;
    padding: 6px 12px;
    border-radius: 20px;
    text-align: left;
    border:0;
      img{
          margin-top:1px;
          width:.5rem;
      }
  }
}
</style>
