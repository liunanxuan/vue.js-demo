import Vue from 'vue'
import Router from 'vue-router'
import indexpage from '../pages/index'
import detailpage from '../pages/detail'
import OrderListPage from '../pages/orderList'
import DetailAnaPage from '../pages/detail/analysis'
import DetailCouPage from '../pages/detail/count'
import DetailForPage from '../pages/detail/forecast'
import DetailPubPage from '../pages/detail/publish'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: indexpage
    },
	{
		path: '/orderList',
		component: OrderListPage
	},
    {
    	path:'/detail',
    	component: detailpage,
    	redirect: '/detail/analysis',
    	children:[
			{
				path: 'analysis',
				component: DetailAnaPage
			},
			{
				path: 'count',
				component: DetailCouPage
			},
			{
				path: 'forecast',
				component: DetailForPage
			},
			{
				path: 'publish',
				component: DetailPubPage
			}    		
    	],
    }
  ]
})
