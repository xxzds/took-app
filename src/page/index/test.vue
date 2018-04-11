<template>
  <div class="page-loadmore">
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <li v-for="item in list" :key="item">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Loadmore,InfiniteScroll } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore,InfiniteScroll);
import {mapState, mapMutations, mapActions } from 'vuex'
 export default {
    data() {
      return {
        list: [],
        allLoaded: false,
        bottomStatus: '',
        wrapperHeight: 0,
        topStatus: '',
        //wrapperHeight: 0,
        translate: 0,
        moveTranslate: 0,
        cateId:'',
        currentPage:1,

      };
    },
    computed:{
      couponItems(){
          return this.$store.state.couponItems.couponItems;
      }
    },
    methods: {
          loadMore() {
            this.loading = true;
            setTimeout(() => {
              let last = this.list[this.list.length - 1];
              for (let i = 1; i <= 10; i++) {
                this.list.push(last + i);
              }
              this.loading = false;
            }, 1000);
          },
          getItem :function(){
            for(let i=0;i<5;i++){
              this.list.push(i)
            }
          }
    },
    created() {
      this.$nextTick(function(){
        this.getItem();
      })
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
  };
</script>

<style lang="less" scoped>
.page-loadmore-wrapper{
  ul{
    li{
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ddd;
      text-align: center;
    }
  }
}

</style>
