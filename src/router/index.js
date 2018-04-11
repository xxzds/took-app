import Vue from 'vue'
import Router from 'vue-router'
// 路由懒加载
import App from '../App'
const index = () => import('@/page/index/index')
const superSearch = () => import('@/page/superSearch/index')
const itemDetail = () => import('@/page/itemDetail/index')
const searchpage = () => import('@/page/searchpage/index')
const listpage = () => import('@/page/list/index')
const itemCates = () => import('@/page/itemCates/index')
const superPageList = () => import('@/page/superPageList/index')
const test = () => import('@/components/couponItems')
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
        },
     ]
    }
  ]
})
