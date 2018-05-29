import Vue from 'vue'
import Router from 'vue-router'
// 路由懒加载
import App from '../App'
import index from '@/page/index/index';
import superSearch from '@/page/superSearch/index';
import itemDetail from '@/page/itemDetail/index';
import searchpage from '@/page/searchpage/index';
import listpage from '@/page/list/index';
import itemCates from '@/page/itemCates/index';
import superPageList from '@/page/superPageList/index';
import test from '@/components/couponItems';
import eventbus from '../utils/eventbus';
Vue.use(Router)

export default new Router({
  mode: 'hash', 
  base: '/dist/',
  routes: [
    {
      path: '/',
      name: 'app',
      component: App,
      redirect:'/index',
      children:[
        {
         name:'index',
         path:'/index',
         component:index,
         meta: {
          keepAlive: true // 需要被缓存
        }
       },
       {
          name:'home',
          path:'/home',
          component:index,
        },
        {
          name:'superSearch',
          path:'/superSearch',
          component:superSearch,
          meta:{
            keepAlive:true
          }
        },
        {
          name:'ninenine',
          path:'/ninenine',
          component:itemDetail,
        },
        {
          name:'itemDetail',
          path:'/itemDetail',
          component:itemDetail,
        },
        {
          name:'qiang',
          path:'/qiang',
          component:itemDetail,
        },
        {
          name:'DailySelection',
          path:'/DailySelection',
          component:itemDetail,
        },
        {
          name:'searchpage',
          path:'/searchpage',
          component:searchpage,
        },
        {
          name:'listpage',
          path:'/listpage',
          component:listpage,
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {
          name:'itemCates',
          path:'/itemCatesPage',
          component:itemCates,
        },
        {
          name:'superPageList',
          path:'/superPageList',
          component:superPageList,
          meta:{
            keepAlive:true
          }
        },
     ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
