import { get_local_cache, set_local_cache } from '@/config/cache'
import { fetch } from '@/config/fetch';
const itemDetails = {
    state:{
        itemDetails_id:'',
        itemDetails:[],
        item:{}
    },
    getters:{
        get_itemDetails:function(state){
            return state.itemDetails;
        },
        get_itemDetails_id:function(state){
            if(state.itemDetails_id==''){
                return get_local_cache('itemDetails_id')
            }
            console.log(state.itemDetails_id)
            return state.itemDetails_id;
        },
        get_item:function(state){
            if(state.item){
                return get_local_cache('item')
            }
             return state.item
        }
    },
    mutations:{
        set_itemDetails(state, val) {
            state.itemDetails = val;
            set_local_cache('itemDetails', val)
        },
        set_id(state, val) {
            state.itemDetails_id = val;
            set_local_cache('itemDetails_id', val)
        },
        set_item(state,val){
            state.item = val
            set_local_cache('item', val)
        }
    }
    ,
    actions:{
        // 获取用户权限
        async get_itemDetails_data({ commit }, params) {
            
            let res = await fetch('POST', 'querygetitem', params)
            if (res) {
                commit('set_itemDetails', res.data)
            }
            return res
        },
        set_itemDetails_data({commit},itemDetails){
            commit('set_itemDetails',itemDetails)
        },
        setId({commit},id){
            commit('set_id',id)
        },
        set_item({commit},item){
            commit('set_item',item)
        }
    }
}

export default itemDetails