import { fetch } from '@/config/fetch'
const couponItems = {
    state:{
        couponItems:[],
    },
    getters:{
        get_couponItems:function(state){
            return state.couponItems;
        }
    },
    mutations:{
        set_couponItems(state, val) {
            state.couponItems.push(...val)
        }
    }
    ,
    actions:{
        // 获取用户权限
        async get_couponItems_data({ commit }, params) {
            let res = await fetch('POST', 'querycouponItems', params)
            if (res) {
                commit('set_couponItems', res.data)
            }
            return res
        }
    }
}

export default couponItems