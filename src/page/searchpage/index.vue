<template>
<div id="searchPage">
    <div class="page">
      <div class="serach">
            <a class="back" @click="back" href="javascript:;">
              <i class="fa fa-angle-left"></i>
            </a>
            <div class="">
               <input @keyup="getSuggest" @keyup.enter="search_Jump" type="text" v-model="search_text" name="keyword" maxlength="200" placeholder="输入关键词">
               <i class="fa fa-close" v-show="closeShow" @click="clear"></i>
               <a v-show="false" href="javascript:;" @click="search">搜索</a>
            </div>
      </div>

      <div class="content" v-show="show">
        <div class="title">热门搜索</div>
        <div class="list">
          <div class="local">
            <a @click="jupmList(item)" href="javascript:;" v-for="(item,index) in local_hot" :key="index">
              {{item}}
            </a>
          </div>
        </div>
        <div class="title">商品分类</div>
        <div class="list">
          <item-cates></item-cates>
        </div>
      </div>
      <div class="suggest" v-show="!show">
        <ul>
          <li @click="jupmList(item)" v-for="(item,index) in suggestList" :key="index">{{item}}</li>
        </ul>
      </div>
    </div>
      <nav-bar></nav-bar>
    </div>
</template>
<script>
import itemCates from '../../components/itemCates'
import navBar from '../index/navBar'
import { get_local_cache, set_local_cache } from '@/config/cache'
import { fetch } from '@/config/fetch'
  export default {
    name: 'searchpage',
    components: {
      itemCates,navBar
    },
    data() {
      return {
        local_hot:[],
        search_text:'',
        len:Number,
        show:true,
        suggestList:[],
        closeShow:false,
      }
    },
    methods:{
      jupmList:function(keyWord){
        this.search_text = keyWord
        this.show = true;
        this.set_local_hot()
        this.$router.push({name:"listpage",params:{keyWord:keyWord}})
      },
      search:function(){
        this.set_local_hot();
      },
      search_Jump:function(){
        this.set_local_hot();
        this.$router.push({name:"listpage",params:{keyWord:this.search_text}})
      },
      back:function(){
        this.$router.go(-1)
      },
      get_local_hot:function(){
        const str = get_local_cache('local_hot')
        if(str=="" || str == null){
          return;
        }
        const arr = str.slice(1, -1).split(',');
        this.len = arr.length
        if(get_local_cache('local_hot')){
          for(let i=0;i<arr.length;i++){
            this.local_hot.push(arr[i].substring(1,arr[i].length-1))
          }
        }
      },
      set_local_hot:function(){

        if(this.search_text!=''){
          let arr = [...this.local_hot]
          if(this.len>=10){
           arr.pop()
          }
          if($.inArray(this.search_text, arr)==-1){
            arr.push(this.search_text)
            set_local_cache('local_hot',arr)
          }
        }
        
      },
      getSuggest:function(){
        if(this.search_text!=''){
           const obj = this;
          const params = {
            q : this.search_text
          }
          this.closeShow = true;
          fetch('POST', 'querySuggest', params).then(res=>{
              if(!res.success){
                alert("调用接口失败");
                return;
              }
              if(res.message="successful"){
                obj.suggestList = res.data
                obj.show = false
              }
          }).catch(err=>{
               obj.show = false
          })
          }
      },
      clear:function(){
        this.search_text = '';
        this.closeShow  = false;
      }
    },
    computed: {
    },
    
    created() {
      this.get_local_hot();
    }
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
#searchPage{
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
      width: 90%;
      position: relative;
      background-color: #fff;
      border-radius: 20px;
      display: flex;
      align-items: center;
      input{
         margin: 0;
         padding: 8px 12px;
         border-radius: 20px;
      }
      i{
        color: #999;
        position: absolute;
        right:.4rem;
        top:10px;
      }
      a{
        padding: 7px 12px;
        color: #fff;
        background-color: #FFB925;
        position: absolute;
        top:0px;
        right:-1px;
        border-radius: 20px;
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
    padding: .4rem;
    .title{
      border-bottom: 1px solid #ddd;
      padding-bottom: .2rem;
      color: #999;
    }
    .list{
      min-height:40px;
      .local{
          text-align: justify;
          padding: .4rem;
          a{
            background-color: #f6f6f6;
            border-radius: 20px;
            padding: 5px 12px;
            margin-bottom: .4rem;
            margin-right: 20px;
            display: inline-block;
          }
      }
      .itemCates{
        padding: .4rem 0;
        .item{
          width: auto;
          margin-right: 20px;
          .img{
            display: none;
          }
          .text{
            background-color: #f6f6f6;
            border-radius: 20px;
             padding: 5px 10px;
          }
        }
      }
    }
  }
}
</style>
