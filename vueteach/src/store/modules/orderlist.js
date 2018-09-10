import Vue from 'vue'

const state = {
	orderlist:[],
	params:{}
}
const getters = {
	getOrderList(state)
	{
		return state.orderlist
	}
}
const actions = {//异步动作  外层通过dispatch方法调用  this.$store.dispatch('fetchOrderList')
	fetchOrderList({commit,state})
	{
		Vue.http.post('./api/getOrderList',state.params)
		.then((res)=>{commit('updateOrderList',res.data.list)},(err)=>{}
		)
		//commit 用于调用mutations 同步动作
	}
}

const mutations = {//同步动作  外层通过commit方法调用this.$store.commit('updateParams',{
    //   key:'productId',
    //    val:obj.value
    //  })
	updateOrderList(state,payload)
	{
		state.orderlist = payload
	},
	updateParams(state,{key,val})
	{
		state.params[key] = val
	}

}
export default{
	state,
	getters,
	actions,
	mutations,
}