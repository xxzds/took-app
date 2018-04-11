<template>
<div id="itemCates">
    <div class="page">
      <div class="serach">
            <a class="back" @click="goBack" href="javascript:;">
              <i class="fa fa-angle-left"></i>
            </a>
            <div class="">
               分类
            </div>
      </div>
      <div class="content">
        <sort-cates></sort-cates>
      </div>
    </div>
    </div>
</template>
<script>
import sortCates from '../../components/itemCates'
import { get_local_cache, set_local_cache } from '@/config/cache'
import { fetch } from '@/config/fetch'
  export default {
    name: 'itemCates',
    components: {
     sortCates
    },
    data() {
      return {
        keyWord:'',
        closeShow: false,
        show:false,
        suggestList:[],
        couponItems:[],
        currentPage:1,
        cateId:''
      }
    },
    methods:{
       goBack:function(){
            this.$router.go(-1)
        },
    },
    computed: {
    },
    created() {
     this.$nextTick(function(){
     })
    },
  }
</script>
<style lang='less'>
#itemCates{
  .serach{
    background:  linear-gradient(#FF3D6F,#FF5BA6);
    padding: .4rem;
    display: flex;
    align-items: center;
    a.back{
      display: inline-block;
      width: 10%;
      text-align: center;
      color: #fff;
      font-size: 200%;
    }
    div{
      width: 80%;
      position: relative;
      border-radius: 20px;
      display: flex;
      align-items: center;
      color: #fff;
      text-align: center;
      display:inline-block;
    }
  }
  .content{
    background-color: #fff;
    
  }
}
</style>
