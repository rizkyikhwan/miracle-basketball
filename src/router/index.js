import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import OrderSuccess from '../views/OrderSuccess.vue'
import Profile from '../views/Profile.vue'
import PageNotFound from '../views/PageNotFound.vue'
import { dbAuth } from '@/firebase/config'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      requireAuth: false
    }
  },
  {
    path: '/product',
    name: 'Products',
    component: Products,
    meta: {
      title: 'Products',
      requireAuth: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
      requireAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register',
      requireAuth: false
    }
  },
  {
    path: '/forgot-passowrd',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      title: 'Forgot Password',
      requireAuth: false
    }
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: {
      title: 'Product Detail',
      requireAuth: false
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      title: 'Cart',
      requireAuth: false
    }
  },
  {
    path: '/checkout',
    name: 'Chekcout',
    component: Checkout,
    meta: {
      title: 'Checkout',
      requireAuth: true
    }
  },
  {
    path: '/order-success',
    name: 'OrderSuccess',
    component: OrderSuccess,
    meta: {
      title: 'Order Success',
      requireAuth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Profile',
      requireAuth: true
    }
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: PageNotFound,
    meta: {
      title: '404',
      requireAuth: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from ,next) => {
  document.title = `${to.meta.title} | Miracle Store`;
  next();
})

router.beforeEach(async (to, from, next) => {
  let user = dbAuth.currentUser;
  if (to.matched.some((res) => res.meta.requireAuth)) {
    if (user) {
      return next()
    }
    return next({name: 'Login'})
  }
  return next()
})

export default router
