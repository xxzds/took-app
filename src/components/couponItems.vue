<template>
  <div class="page-loadmore" id="loadmore">
    <!-- <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }"> -->
      <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight }">
        <header>
          <slot name="header"></slot>
        </header>
      <ul class="page-loadmore-list"
        v-infinite-scroll="loadMore"
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
</template>

<script>
import Vue from 'vue'
import { Loadmore,InfiniteScroll } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore,InfiniteScroll);
import { fetch } from '@/config/fetch'
import {mapState, mapMutations, mapActions } from 'vuex'
 export default {
   props:{
     queryUrl:String,
     flag:Boolean,
     params:Object,
     text:Boolean
   },
    data() {
      return {
        list: [],
        allLoaded: false,
        bottomStatus: '',
        wrapperHeight: 0,
        topStatus: '',
        translate: 0,
        moveTranslate: 0,
        cateId:'',
        couponItems:[]
      };
    },
    computed:{
    },
    methods: {
          loadMore() {
            this.loading = true;
            if(!this.flag){
              this.getItem();
            }
          },
          getItem :function(){
            const obj = this;
           if(this.queryUrl!=''){
              fetch('POST', this.queryUrl, this.params).then(res=>{
                  obj.couponItems.push(...res.data);
                  obj.params.currentPage++;
                  obj.loading = false;
              }).catch(err=>{
              })
           }
          },
          jumpToItemDetails:function(item){
           this.setId(item.id);
           this.set_item(item)
           if(this.$router.history.current.name=='itemDetail'){
             window.location.reload();
           }else{
              this.$router.push({
                  name: 'itemDetail',
                  params:{item:item}
              })
           }
          
         },
         ...mapActions(['get_couponItems_data','setId','set_item']),
    },
    created() {
      this.$nextTick(function(){
        if(this.text){
          this.getItem();
        }
        if(!this.flag){
          this.wrapperHeight = (document.documentElement.clientHeight - document.getElementById('loadmore').scrollTop)+'px';
        }else{
          this.wrapperHeight = 'auto'
        }
        //this.wrapperHeight = (document.documentElement.clientHeight - document.getElementById('loadmore').scrollTop)+'px';
      })
    },
    watch: {
      queryUrl: function (newUrl, oldUrl) {
        //  this.couponItems = []
        // this.getItem();
        // this.wrapperHeight = document.documentElement.clientHeight - document.getElementById('loadmore').scrollTop;
      },
      params:function(newPra,oldPra){
        this.couponItems = []
        this.getItem();
        if(!this.flag){
          this.wrapperHeight = (document.documentElement.clientHeight - document.getElementById('loadmore').scrollTop)+'px';
        }
      }
    }
  };
</script>
<style lang="less" scoped>
.page-loadmore-list{
  display: flex;
  justify-content:flex-start;
  align-items:flex-start;
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
      white-space:nowrap; 
      text-overflow:ellipsis; 
      padding: .2rem 4px 0 4px;
      overflow: hidden;
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
    overflow: scroll;
    -webkit-overflow-scrolling : touch;
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
