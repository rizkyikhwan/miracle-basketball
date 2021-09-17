import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import OrderSuccess from '../views/OrderSuccess.vue'
import PageNotFound from '../views/PageNotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/product',
    name: 'Products',
    component: Product,
    meta: {
      title: 'Products'
    }
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: {
      title: 'Product Detail'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      title: 'Cart'
    }
  },
  {
    path: '/checkout',
    name: 'Chekcout',
    component: Checkout,
    meta: {
      title: 'Checkout'
    }
  },
  {
    path: '/order-success',
    name: 'OrderSuccess',
    component: OrderSuccess,
    meta: {
      title: 'Order Success'
    }
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: PageNotFound,
    meta: {
      title: '404'
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

export default router
