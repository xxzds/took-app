<template>
  <div class="page-loadmore" id="loadmore">
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <div v-if="flag">
          <mt-loadmore :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange"       :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
              <ul class="page-loadmore-list" v-infinite-scroll="loadMore"
              infinite-scroll-disabled="loading"
              infinite-scroll-distance="10">
                <li v-for="(item,index) in couponItems" class="page-loadmore-listitem" :key="index" @click="jumpToItemDetails(item)">
                  <div class="img">
                    <!-- <img :src="item.picUrl"/> -->
                    <img v-lazy.loadmore="item.picUrl"/>
                    <span>
                      券￥{{item.quan}}
                    </span>
                  </div>
                  <div class="text">
                    {{item.title}}
                  </div>
                  <div class="price">
                    <span class="left">券后价<span>￥{{item.couponPrice}}</span></span>
                  </div>
                </li>
              </ul>
            <div slot="top" class="mint-loadmore-top">
                <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">下拉刷新</span>
                <span v-show="topStatus === 'loading'">
                  <mt-spinner type="snake"></mt-spinner>
                </span>
              </div>    
              <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">上滑刷新</span>
                <span v-show="bottomStatus === 'loading'">
                  <mt-spinner type="snake"></mt-spinner>
                </span>
              </div>
            </mt-loadmore>
      </div>
      <div v-else>
        <ul class="page-loadmore-list" v-infinite-scroll="loadMore"
              infinite-scroll-disabled="loading"
              infinite-scroll-distance="10">
                <li v-for="(item,index) in couponItems" class="page-loadmore-listitem" :key="index" @click="jumpToItemDetails(item)">
                  <div class="img">
                    <!-- <img :src="item.picUrl"/> -->
                    <img v-lazy.loadmore="item.picUrl"/>
                    <span>
                      券￥{{item.quan}}
                    </span>
                  </div>
                  <div class="text">
                    {{item.title}}
                  </div>
                  <div class="price">
                    <span class="left">券后价<span>￥{{item.couponPrice}}</span></span>
                  </div>
                </li>
              </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Loadmore,InfiniteScroll } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore,InfiniteScroll);
import {mapState, mapMutations, mapActions } from 'vuex'
import { Lazyload } from 'mint-ui';
 export default {
   props: {
      couponItems: Array,
      flag:Boolean
    },
    data() {
      return {
        list: [],
        allLoaded: false,
        bottomStatus: '',
        wrapperHeight: 'auto',
        topStatus: '',
        //wrapperHeight: 0,
        translate: 0,
        moveTranslate: 0,
        cateId:'',
        currentPage:1,

      };
    },
    computed:{
    },
    methods: {
         jumpToItemDetails:function(item){
           this.setId(item.id);
           this.set_item(item)
           if(this.$router.history.current.name=='itemDetail'){
             window.location.reload();
           }else{
              this.$router.push({
                  name: 'itemDetail'
              })
           }
          
         },
          handleBottomChange(status) {
            this.bottomStatus = status;
          },
          loadBottom() {
            setTimeout(() => {
              let lastValue = this.list[this.list.length - 1];
              if (lastValue < 40) {
                for (let i = 1; i <= 10; i++) {
                  this.list.push(lastValue + i);
                }
              } else {
                this.allLoaded = true;
              }
              this.$refs.loadmore.onBottomLoaded();
            }, 1500);
          },
          handleTopChange(status) {
            this.moveTranslate = 1;
            this.topStatus = status;
          },
          translateChange(translate) {
            const translateNum = +translate;
            this.translate = translateNum.toFixed(2);
            this.moveTranslate = (1 + translateNum / 70).toFixed(2);
          },
          loadTop() {
            this.getItem();
            this.$refs.loadmore.onTopLoaded();
          },
          getItem:function(){
              const params = {
                cateId:this.cateId,
                currentPage:this.currentPage,
                pageSize:20
              }
              this.get_couponItems_data(params).then(res=>{
                  this.currentPage++
              }).catch(err=>{
                
              })
          },
          ...mapActions(['get_couponItems_data','setId','set_item']),
          loadMore() {
            this.loading = true;
            setTimeout(() => {
             this.getItem();
              this.loading = false;
            }, 1000);
          }
    },
    created() {
      this.$nextTick(function(){
      })
    },
    mounted() {
      //this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
  };
</script>

<style lang="less" scoped>
.page-loadmore-list{
  display: flex;
  justify-content:flex-start;
  align-items: center;
  flex-wrap:wrap;
  li{
    text-align: center;
    width: 50%;
    // padding: .4rem;
    .img{
      position: relative;
      img{
        width: 100%;
      }
      span{
        background:  linear-gradient(#F2AE2E,#FE8102);
        color:#fff;
        padding: 2px 5px;
        position: absolute;
        right: 0;
        font-size: 80%;
        bottom: 0;
        }
    }
    .text{
      color:#777;
      text-align: justify;
      font-size: 80%;
      padding: .2rem 4px 0 4px;
    }
    .price{
      text-align: left;
      // padding-top:.4rem;
       padding: 0 5px .2rem 0;
      .left{
        color: #f54d23;
        // font-size: 70%;
        padding-left: 5px;
        span{
          font-size: 120%;
          font-weight: bold;
        }
      }
    }
  }
}
image[lazy=loading] {
  border:3px solid red;
}
.loading-background, .mint-loadmore-top span {
    -webkit-transition: .2s linear;
    transition: .2s linear
}
.mint-loadmore-top span {
    display: inline-block;
    vertical-align: middle
}

.mint-loadmore-top span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
}

.page-loadmore .mint-spinner {
    display: inline-block;
    vertical-align: middle
}

.page-loadmore-desc {
    text-align: center;
    color: #666;
    padding-bottom: 5px
}

.page-loadmore-desc:last-of-type,
.page-loadmore-listitem {
    border-bottom: 1px solid #eee
}


.page-loadmore-wrapper {
    overflow: scroll
}

.mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
}

.mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
}

</style>
