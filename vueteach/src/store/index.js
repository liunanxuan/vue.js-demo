import Vue from 'vue'
import Vuex from 'vuex'
import orderlist from './modules/orderlist'
Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
		orderlist
	}
}
)
