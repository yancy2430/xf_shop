import Vue from 'vue'
import Router from 'vue-router'
import Header from '../components/common/header-nav'
import Footer from '../components/common/footer-nav'
import Footers from '../components/common/footer-navs'
import Purchase from '../components/common/purchase'

// import News from '../components/set/setName'
import Index from '@/components/index'
import Mine from '../components/mine/index'
import LoginR from '../components/loginR'
import TelPass from '../components/password/telPass'
import ChangePass from '../components/password/changePass'
// import Regsiter from '../components/common/regsiter'
// import Login from '../components/common/login'

import Warranty from '../components/set/setWarranty'


import Invite from '../components/invite/index'
import NotFount from '../components/404'

// 问题中心
import Question from  '../components/question/index'
import QuestionDetails from '../components/question/questionDetails'
// 我的 设置
import Set from '../components/set/index'
import SetIhpone from '../components/set/setIphone'
import SetLocation from '../components/set/setLocation'
import SetEmall from '../components/set/setEmail'
import SetAddress from '../components/set/setAddress'

// 全部订单
import Order from '../components/order/index'
import AllOrder from '../components/order/allOrders'
import PaymentOrders from '../components/order/paymentOrder'
Order
// 商品详情
import Product from '../components/product/productDetails'
import ProductV from '../components/product/productValuation'
import ProductOrder from '../components/product/productOrder'


// 我的积分 积分提现
import Integral from '../components/integral/index'
import IntegralList from '../components/integral/integralList'
import IntegralRule from '../components/integral/integralRule'
import IntegralGive from '../components/integral/integralGive'
// import IntegralGiveList from '../components/integral/integralGiveList'
import IntegralGiveList from "../components/integral/integralGiveList"

// 邀请好友  通过首页 积分页面
import Friends from '../components/friends/index'
import FriendsList from '../components/friends/friendsList'

// 售后
import SalesReturn from '../components/sales/salesReturn'
import ReturnSuccess from '../components/sales/returnSuccess'
import SalesEvaluate from '../components/sales/salesEvaluate'
import EvaluationSuccess from '../components/sales/evaluationSuccess'


// 全局安装头部组件
Vue.component("header-nav",Header)
// 全局安装底部组件1
Vue.component('footer-nav',Footer)
// 全局安装底部组件2
Vue.component('footer-navs',Footers)
// 全局安装底部组件2
Vue.component('purchase',Purchase)


// // 数据请求
// import  Axios from 'axios'
// Axios.defaults.baseURL = 'http://xiaofeng.ckugua.com/'
// Vue.prototype.$ajax = Axios
// Vue.prototype.dataURL = function(file,title,id){
//     id = (id === undefined )?'':id;
//     return file + '?title='+title;
// }

Vue.use(Router)

export default new Router({
  routes: [
        {
          path: '/',
          name: 'index',
          component: Index
        },
        {
          path:"/mine/index",
          name: 'mine',
          component:Mine
        },
        {
           path:'/loginR',
           name:'loginR',
           component:LoginR
        },
        {
          path:'/password/telPass',
          name:'TelPass',
          component:TelPass
        },
        {
          path:'/password/ChangePass',
          name:'ChangePass',
          component:ChangePass
        },
        {
          path:'/order/index',
          name:"order",
          component:Order
        },
        {
          path:'/order/allOrder',
          name:"allOrder",
          component:AllOrder
        },
        {
          path:'/order/paymentOrders',
          name:"paymentOrders",
          component:PaymentOrders
        },
        {
          path:'/set/index',
          name:"set",
          component:Set,
        },
        {
          path:'/set/setIhpone',
          name:'setIhpone',
          component:SetIhpone
        },
        {
          path:'/set/Warranty',
          name:'warranty',
          component:Warranty
        },
        {
          path:'/set/setLocation',
          name:'setLocation',
          component:SetLocation
        },
        {
          path:'/set/setEmall',
          name:'setEmall',
          component:SetEmall
        },
        {
          path:'/set/setAddress',
          name:'setAddress',
          component:SetAddress
        },
        {
            path:'/question/index',
            name:'question',
            component:Question
        },
        {
            path:'/question/questionDetails',
            name:'questionDetails',
            component:QuestionDetails
        },
        {
            path:'/integral/index',
            name:'integral',
            component:Integral
        },
        {
            path:'/integral/integralList',
            name:'integralList',
            component:IntegralList
        },
        {
            path:'/integral/integralRule',
            name:'integralRule',
            component:IntegralRule
        },
        {
           path:'/integral/integralGive',
           name:'integralGive',
           component:IntegralGive
        },
        {
            path:'/integral/integralGiveList',
            name:'integralGiveList',
            component:IntegralGiveList
        },
        {
            path:'/invite/index',
            name:'invite',
            component:Invite
        },
        {
          path:'/friends/index',
          name:'friends',
          component:Friends
        },
        {
          path:'/friends/friendsList',
          name:'friendsList',
          component:FriendsList
        },
        {
          path:'/product/productDetails',
          name:'product',
          component:Product
        },
        {
           path:'/product/productValuation',
           name:'productValuation',
           component:ProductV
        },
        {
            path:'/product/productOrder',
            name:'productOrder',
            component:ProductOrder,
        },
        {
            path:'/sales/salesReturn',
            name:'salesReturn',
            component:SalesReturn
        },
        {
            path:'/sales/salesEvaluate',
            name:'salesEvaluate',
            component:SalesEvaluate
        },
      {
          path:'/sales/evaluationSuccess',
          name:'evaluationSuccess',
          component:EvaluationSuccess
      },
      {
          path:'/sales/returnSuccess',
          name:'returnSuccess',
          component:ReturnSuccess
      },
      {
          path:'*',
          component:NotFount
      }
      
       
    
    
      // {
      //   path:'/common/regsiter',
      //   name:'regiter',
      //   component:Regsiter
      // },
      // {
      //   path:'/common/login',
      //   name:'login',
      //   component:Login
      // },

  ]
})
