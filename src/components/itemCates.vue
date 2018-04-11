<template>
    <div id="itemCates">
      <div class="itemCates">
         <div class="item" @click="jumpList(item.id)" v-for="item in itemCates" :key="item.id" v-show="item.isAvailable==1" :style="{width:itemWidth}">
           <div class="img">
             <img :src="item.itemCateIconUrl"/>
           </div>
           <div class="text">{{item.itemCateName}}</div>
         </div>
      </div>
    </div>
</template>
<script>
import {mapState, mapMutations, mapActions } from 'vuex'
  // swiper options example:
  export default {
    name: 'itemCates',
    props: {
          itemWidth: String
        },
    data() {
      return {
      }
    },
    methods:{
    ...mapActions(['get_itemCates_data']),
    jumpList:function(id){
        this.$router.push({name:"listpage",params:{cateId:id}})
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },
    computed: {
      itemCates(){
          return this.$store.state.itemCates.itemCates;
      }
    },
    created() {
      this.$nextTick(function(){
        this.get_itemCates_data();
      })
    },
  }
</script>
<style lang='less'>
.itemCates{
  display:flex;
  justify-content:flex-start;
  align-items: center;
  flex-wrap:wrap;
  padding: .4rem .3rem;
  .item{
    width:20%;
    text-align: center;
    margin-bottom: .4rem;
    .img{
      img{width: 100%;max-width: 40px;}
    }
    .text{
      font-size: 80%;
      padding:5px 0;
    }
  }
}
</style>
