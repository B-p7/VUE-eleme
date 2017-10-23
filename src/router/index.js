import Vue from 'vue'
import Router from 'vue-router'
import goods from 'components/goods/goods'
import seller from 'components/seller/seller'
import ratings from 'components/ratings/ratings'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: '商品',
      component: goods
    },
    {
      path: '/seller',
      name: '商家',
      component: seller
    },
    {
      path: '/ratings',
      name: '评论',
      component: ratings
    }
  ]
})
