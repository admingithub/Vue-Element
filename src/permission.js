import router from './router'
import global from './router/global.js'
// import { getToken } from './utils/cookie.js' // get token from cookie
// import { setToken } from '@/utils/auth' // set token to cookie

router.beforeEach(async(to, from, next) => {
	if(to.meta.title){
		document.title=to.meta.title;
	}
	if(localStorage.getItem(global.tokenId)){
		if(to.path === "/login")
			next({ path: '/ ' })
		else
			next();
	}
	else{
		if(to.path === "/login"){
			next();
		}
		else
			next({ path: '/login' })
	}
});