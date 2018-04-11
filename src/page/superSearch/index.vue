<template>
    <div id="superSearch">
      <div class="serach">
          <h2><i>超级搜索</i></h2>
          <div class="clearboth"><input type="text" @keyup.enter="search" name="keyword" v-model="keyword" maxlength="200" placeholder="输入关键词或粘贴宝贝标题"></div>
          <mt-button @click="search" type="default">点击搜索</mt-button>
          <div class="tips">
            <span>数亿件商品，所有商品都能搜!</span>
          </div>
      </div>
      <item-cates class="super" :itemWidth="itemWidth"></item-cates>
    </div>
</template>
<script>
import vueSwiper from '../../components/VueSwiper'
import itemCates from '../../components/itemCates'
import { Toast } from 'mint-ui';
  export default {
    name: 'container',
    components: {
        vueSwiper,
        itemCates
    },
    data() {
      return {
        itemWidth:'33.3333%',
        keyword:''
      }
    },

    computed: {
    },

    created() {
    },
    methods:{
      search:function(){
        if(this.keyword=='' || this.keyword==undefined){
           Toast('搜索内容不能为空！');
           return;
        }
        if (/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g.test(this.keyword)) {
            Toast('粘贴商品标题试试~（链接地址不支持）！');
            return;
        }
        this.$router.push({name:"superPageList",params:{keyWord:this.keyword}})
      }
    },
  }
</script>
<style lang='less'>
#superSearch{
  background-color: #ecf3ff;
  padding: .4rem;
  .serach{
    background-color: #fbebeb;
    padding: .4rem;
    border-radius: 5px;
    h2{
     width: 88%;
      margin: 0 auto;
      position: relative;
      background: url('../../assets/icon/titleBg.png') repeat-x left center;
      margin-bottom: .6rem;
      font-style: normal;
      i{
        display: block;
        font-size: .6rem;
        color: #333;
        background: #fce9ec;
        width: 50%;
        text-align: center;
        margin: 0 auto;
      }
    }
    .clearboth{
      input{
            width: 100%;
            height: initial;
            margin: 0;
            padding: .15rem .5rem;
            line-height: .8rem;
      }
    }
    .mint-button{
      background-color: #fd385d;
      color:#fff;
      width: 100%;
      margin-top:.4rem;
    }
    .tips{
      padding-top: .4rem;
      text-align:center;
    }
  }
  .super{
      background-color: #fff;
      border-radius: 5px;
      margin-top:1rem;
      .itemCates{
        .item{
          width: 33.33333%;
        }
      }
    }
}
</style>
