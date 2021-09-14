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
    component: Home
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/checkout',
    name: 'Chekcout',
    component: Checkout
  },
  {
    path: '/order-success',
    name: 'OrderSuccess',
    component: OrderSuccess
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: PageNotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
