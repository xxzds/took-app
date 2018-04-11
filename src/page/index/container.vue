<template>
    <div id="homeContent">
        <!-- 广告轮播 -->
        <!-- <vue-swiper :itemImg="itemImg"></vue-swiper> -->
        <!-- <coupon-items :couponItems="couponItems" :flag="true"></coupon-items> -->
        <coupon-items :queryUrl="url" :params='params' :flag="false" :text="true">
          <div slot="header">
             <item-cates :itemWidth="itemWidth"></item-cates>
          </div>
        </coupon-items>
    </div>
</template>
<script>
import vueSwiper from '../../components/VueSwiper'
import itemCates from '../../components/itemCates'
import couponItems from '../../components/couponItems'
import {mapState, mapMutations, mapActions } from 'vuex'
  export default {
    name: 'container',
    components: {
        vueSwiper,
        itemCates,
        couponItems
    },
    data() {
      return {
        ItemCates:[],
        itemWidth:'20%',
        itemImg:[],
        currentPage:1,
        cateId:'',
        url:'querycouponItems',
        params:{cateId: "", currentPage: 1, pageSize: 20},
      }
    },
    methods:{
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
      getItemImg:function(){
          this.$http.get('http://www.tooklili.com:81/tookApp/getItemImg').then(response => {
            this.itemImg = response.data.data; 
          }, response => {
            
          });
        }
    },
    computed: {
       couponItems(){
          return this.$store.state.couponItems.couponItems;
      }
    },
    created() {
      this.$nextTick(function(){
        //获取轮播图片
       // this.getItemImg();
        //获取数据
        this.getItem();
      })
    }
  }
</script>
<style lang='less'>
#homeContent{
  position: relative;
  // height: calc(100% - 100px);
  padding-bottom: 60px;
  // overflow:auto;
  .swipe{
       height: 156.25px;
  }
  .mint-swipe {
    height: auto;
  }
}
</style>
