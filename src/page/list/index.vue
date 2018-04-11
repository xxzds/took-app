<template>
<div id="listPage">
    <div class="page">
      <div class="serach">
            <a class="back" @click="goBack" href="javascript:;">
              <i class="fa fa-angle-left"></i>
            </a>
            <div class="input">
               <input @keyup="getSuggest" @keyup.enter="search" type="text" v-model="keyWord" name="keyword" maxlength="200" placeholder="输入关键词或粘贴宝贝标题">
               <i class="fa fa-close" v-show="closeShow" @click="clear"></i>
               <a href="javascript:;" @click="search">搜索</a>
            </div>
            <a @click="sort" href="#" class="sort">
                <img src="@/assets/icon/sort.png" /><br/>
                <span>分类</span>
            </a>
      </div>
      <div class="content">
          <!-- <coupon-items :couponItems="couponItems" :flag="false"></coupon-items> -->
          <coupon-items :queryUrl="url" :params='params' :flag="false" ref="headerCom"></coupon-items>
      </div>
      <div class="suggest" v-show="!show">
        <ul>
          <li  v-for="(item,index) in suggestList" :key="index">{{item}}</li>
        </ul>
      </div>
    </div>
    </div>
</template>
<script>
import couponItems from '../../components/couponItems'
import { get_local_cache, set_local_cache } from '@/config/cache'
import { fetch } from '@/config/fetch'
  export default {
    name: 'searchpage',
    components: {
      couponItems
    },
    data() {
      return {
        keyWord:'',
        closeShow: false,
        show:false,
        suggestList:[],
        couponItems:[],
        currentPage:1,
        cateId:'',
        url:'',
        params:{},
      }
    },
    methods:{
        sort:function(){
          this.$router.push({name: 'itemCates'})
        },
        getRouterParams:function(){
           this.keyWord = this.$route.params.keyWord;
           this.cateId = this.$route.params.cateId;
           if(this.$route.params.cateId!=''&& this.$route.params.cateId!=undefined){
               this.getRandomItemByCateId()
           }else{
               //通过关键字获取商品
              this.getCouponItems();
           }
        },
        clear:function(){
            this.keyWord = '';
            this.closeShow  = false;
        },
        search:function(){
           this.getCouponItems();
        },
        getSuggest:function(){

        },
        goBack:function(){
            this.$router.go(-1)
        },
        getCouponItems:function(){
            const obj = this
            const params = {
                keyWords:this.keyWord,
                currentPage:this.currentPage,
                pageSize:20
            }
            if(this.keyWord == '' || this.keyWord == undefined){
                const par = {
                    cateId:'',
                    currentPage:this.currentPage,
                    pageSize:20
                }
                obj.url = 'querycouponItems',
                obj.params = par;
                // fetch('POST', 'querycouponItems', par).then(res=>{
                //     obj.couponItems = res.data
                // }).catch(err=>{

                // })

            }else{
                obj.url = 'queryCouponItemsByKeyWords',
                obj.params = params;
                // fetch('POST', 'queryCouponItemsByKeyWords', params).then(res=>{
                //     obj.couponItems = res.data
                // }).catch(err=>{

                // })
            }
        },
        getRandomItemByCateId:function(){
            const obj = this
            const params = {
                cateId:this.cateId,
                currentPage:1,
                pageSize:20
            }
            if(this.cateId=='' || this.cateId== undefined){
                return;
            }
           obj.url = 'querycouponItems',
           obj.params = params;
            // fetch('POST', 'querycouponItems', params).then(res=>{
            //     obj.couponItems = res.data
            //     console.log(res)
            // }).catch(err=>{

            // })
        }
    },
    computed() {
    },
    created() {
     this.$nextTick(function(){
          this.getRouterParams();
          // alert(JSON.stringify(this.$refs.headerCom.couponItems.length));
     })
    },
  }
</script>
<style lang='less'>
*{
  box-sizing: border-box;
}
.page{
  position: relative;
  height: calc(100% - 50px);
}
#listPage{
  .serach{
    background:  linear-gradient(#FF3D6F,#FF5BA6);
    padding: .4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top:0;
    left:0;
    right:0;
    z-index: 999;
    a.back{
      display: inline-block;
      width: 10%;
      text-align: center;
      color: #fff;
      font-size: 200%;
    }
    a.sort{
        width: 10%;
        text-align: center;
         color:#fff;
         font-size: 80%;
        img{
          width:50%;
        }
        
    }
    div{
      width: 80%;
      position: relative;
      background-color: #fff;
      border-radius: 20px;
      display: flex;
      align-items: center;
      height: 35px;
      line-height: 35px;
      input{
         margin: 0;
         border-radius: 20px;
         border:0;
         width:80%;
         font-size: 80%;
         padding-left: 20px;
      }
      i{
        color: #999;
      }
      a{
       display: inline-block;
        color: #fff;
        background-color: #FFB925;
        position: absolute;
        top:0px;
        right:-1px;
        border-radius: 20px;
        padding: 0 10px;
      }
    }
  }
  .suggest{
    padding: .4rem;
    ul{
      width: 100%;
      li{
        width: 100%;
        padding: .2rem 0;
        &:not(:last-child){
          border-bottom: 1px solid #ddd;
        }
      }
    }
  }
  .content{
    background-color: #fff;
    padding-top:70px;
  }
}
</style>
