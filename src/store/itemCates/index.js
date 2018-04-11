import { fetch } from '@/config/fetch'
const itemCates = {
    state:{
        itemCates:[]
    },
    mutations:{
    },
    getters:{
        get_iemCates:function(state){
            return state.itemCates;
        }
    },
    mutations:{
        set_itemCates(state, val) {
            state.itemCates = val
        }
    }
    ,
    actions:{
        // 获取用户权限
        get_itemCates_data({ commit }, userid) {
            const params = {
            }
         fetch('POST', 'queryItemCates', params).then(res => {
                if (res.data) {
                    commit('set_itemCates', res.data)
                }
            })
        }
    }
}

export default itemCates