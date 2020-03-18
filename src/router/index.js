import Vue from 'vue'	
import VueRouter from 'vue-router'
import Layout from '../components/layout.vue'

Vue.use(VueRouter)

export const constantRoutes = [{
		path:'/login',
		component:()=>import('@/views/login/login.vue'),
		isShow:false,
		index:'1',
		icon:'',
		meta:{
			title:'登录'
		},
		children:[]
	},{
		path:'/',
		component:Layout,
		redirect:'/dashboard',
		isShow:true,
		index:'1',
		icon:'el-icon-house',
		meta:{title:'首页'},
		children: [{
			path: '',
			name: 'Dashboard',
			index:'1-1',
			component: () => import('@/views/index.vue'),
			children:[],
			meta: { title: '首页' }
		}]
	},{
		path:'/form',
		component:Layout,
		isShow:true,
		index:'2',
		icon:'el-icon-scissors',
		meta:{title:'组件'},
		children:[{
			path:'/formpage',
			name:'formpage',
			isShow:true,
			index:'2-1',
			icon:'',
			component:()=>import('@/views/form/form.vue'),
			children:[],
			meta:{
				title:'表单页面'
			}
		},{
		path:'/tablepage',
		name:'tablepage',
		isShow:true,
		index:'2-1',
		icon:'',
		children:[],
		component:()=>import('@/views/form/table.vue'),
		meta:{
			title:'列表页面',
		},
	}]
	},{
		path:'/notice',
		isShow:true,
		index:'3',
		icon:'el-icon-headset',
		component:Layout,
		meta:{title:'通知'},
		children:[{
			path:'/notice/info',
			isShow:true,
			index:'3-1',
			icon:'',
			component:()=>import('@/views/notice/InfoNotice.vue'),
			meta:{
				title:'消息提示'
			},
			children:[]
		},{
			path:'/notice/alter',
			isShow:true,
			index:'3-2',
			icon:'',
			component:()=>import('@/views/notice/AlertNotice.vue'),
			meta:{
				title:'消息弹框提示'
			},
			children:[]
		}]
	},{
		path:'/error',
		isShow:true,
		index:'4',
		icon:'el-icon-folder-delete',
		component:Layout,
		meta:{title:'错误页面'},
		children:[{
			path:'/error/401',
			isShow:true,
			index:'4-1',
			icon:'',
			component:()=>import('@/views/error/401.vue'),
			meta:{
				title:'401'
			},
			children:[]
		},{
		path:'/error/404',
		isShow:true,
		index:'4-2',
		icon:'',
		component:()=>import('@/views/error/404.vue'),
		meta:{
			title:'404'
		},
		children:[]
	}]
	},{
		path:'/user',
		isShow:true,
		index:'5',
		icon:'el-icon-user',
		component:Layout,
		meta:{
			title:'用户管理'
		},
		children: [{
			path: '/userIndex',
			index:'5-1',
			component: () => import('@/views/user/user.vue'),
			children:[],
			meta: { title: '用户列表' }
		}]
	}];

const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()

export default router