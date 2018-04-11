<template>
    <div id="navBar">
        <div class='nav_item' v-for='(item,key) in navData' @click.stop='itemClick(item)' :class="{active: selected == item.route}" v-bind:key="key">
            <div class='nav_icon' :class='item.class'></div>
            <p class='nav_name'>{{item.name}}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'navBar',
    data () {
        return {
            navData: [
                {name: '主页', class: 'home', route: 'home'},
                // {name: '九块九', class: 'ninenine', route: 'ninenine'},
                // {name: '咚咚呛', class: 'qiang', route: 'qiang'},
                // {name: '每日精选', class: 'DailySelection', route: 'DailySelection'},
                {name: '超级搜', class: 'superSearch', route: 'superSearch'}
            ],
            selected: 'home'
        }
    },
    watch: {
        $route (val) {
            this.init()
        }
    },
    methods: {
        init () {
            if (this.$route.name === 'home' || this.$route.name === 'ninenine' || this.$route.name === 'qiang' || this.$route.name === 'DailySelection' || this.$route.name === 'superSearch') {
                this.selected = this.$route.name
            }
        },
        itemClick(item) {
            this.$router.push({name: item.route})
            this.selected = item.route
        }
    }
}
</script>
<style lang='less'>
#navBar{
  position: fixed;
  height: 48px;
  z-index: 999;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background-color: #fff;
  border-top: 1xp solid #ddd;
  padding: 2px 0;
  overflow: hidden;
  .nav_item{
    flex:1;
    &:not(:last-child){
        border-right: 0.5px solid #eaeaea;
    }
    .nav_name{
      text-align: center;
      font-size: 10px;
      color: #222;
      line-height: 16px;
    }
    .nav_icon{
      background-size: 22px!important;
      height: 28px;
      padding-bottom: 4px;
      &.home{
         background: url('../../assets/icon/home.png') no-repeat center center;
      }
      &.ninenine{
         background: url('../../assets/icon/9.9.png') no-repeat center center;
      }
      &.qiang{
         background: url('../../assets/icon/qiang.png') no-repeat center center;
      }
      &.DailySelection{
         background: url('../../assets/icon/jian.png') no-repeat center center;
      }
      &.superSearch{
         background: url('../../assets/icon/s.png') no-repeat center center;
      }
    }
     .nav_item.active {
       .nav_name {
            color: #FF5BA6;
        }
        &.home{
          background: url('../../assets/icon/home.png') no-repeat center center;
        }
        &.ninenine{
          background: url('../../assets/icon/9.9.png') no-repeat center center;
        }
        &.qiang{
          background: url('../../assets/icon/qiang.png') no-repeat center center;
        }
        &.DailySelection{
          background: url('../../assets/icon/jian.png') no-repeat center center;
        }
        &.superSearch{
          background: url('../../assets/icon/s.png') no-repeat center center;
        }
     }
  }
}
</style>
