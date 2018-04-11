import Vue from 'vue'
import Vuex from 'vuex'
import itemCates_module from './itemCates/index'
import couponItems_module from './couponItems/index'
import itemDetails_module from './itemDetails/index'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
		itemCates: itemCates_module,
    couponItems: couponItems_module,
    itemDetails: itemDetails_module,
    }
})
