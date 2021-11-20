import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'



Vue.use(VueRouter)

const routes = [
 {
      path:'/',
      redirect:'/index',
 },
 {
   path:'/index',
   name:'index',
   component:Index
 },
 {
   path:'/register',
   name:'register',
   component:Register
 },
 {
   path:'/login',
   name:'login',
   component:Login
 },
 {
   path:'*',
   name:'/404',
   component:NotFound
 }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

//路由守衛
router.beforeEach((to,from,next)=>{
    const hastoken=localStorage.getItem('tokenId');
    
    if(to.path == '/login' || to.path=='/register'){
      next();
      return
    }

    if(hastoken){
        next();
    }else{
        next('/login');
    }
   
})



export default router
