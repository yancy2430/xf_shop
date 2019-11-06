<template>
  <div class="mine">

      <div class="photo">
           <div class="photo-t" v-if="show">
                <img src="/static/images/portrait.png" alt="">
                <router-link :to="{name:'loginR'}">点此登陆</router-link>
           </div>
            <div class="photo-t" v-if="!show">
                <img :src="headImgUrl" alt="">
                <router-link :to="{name:'loginR'}">{{name}}</router-link>
           </div>
           <div class="photo-b">
                 <div class="photo-order" @click="orderIn">
                      <div class="order-l"><span>我的订单</span></div>
                      <div class="order-r">
                           <span>全部订单</span>

                      </div>
                 </div>
                 <!--   全部订单信息  -->
               <div class="order-ul">
                     <ul>
                           <li @click="clickOrderStatus(0)">
                               <img src="/static/images/order-1.png" alt="">
                               <span>待付款</span>
                           </li>
                           <li @click="clickOrderStatus(1)">
                               <img src="/static/images/order-2.png" alt="">
                               <span>待发货</span>
                           </li>
                           <li @click="clickOrderStatus(2)">
                               <img src="/static/images/order-3.png" alt="">
                               <span>待收货</span>
                           </li>
                           <li @click="clickOrderStatus(3)">
                               <img src="/static/images/order-4.png" alt="">
                               <span>待评价</span>
                           </li>
                           <li @click="clickOrderStatus(4)">
                               <img src="/static/images/order-5.png" alt="">
                               <span>售后</span>
                           </li>
                     </ul>
               </div>
           </div>
      </div>
      <!-- 分割线-->
      <div class="integral">
             <div class="set" @click="integralIn">
                  <div class="set-l">
                      <img src="/static/images/integral.png" alt="" class="img">
                      <span>我的积分</span>
                  </div>
                 <div class="set-r">
                   <img src="/static/images/next.png" alt="" >
                 </div>
            </div>
            <div class="set" @click="inviteIn">
                <div class="set-l"><img src="/static/images/gift.png" alt="" class="img">
                  <span>邀请有礼</span>
                </div>
                <div class="set-r">
                  <img src="/static/images/next.png" alt="" >
                </div>

            </div>
            <!---->
            <div class="set" @click="questionIn">
              <div class="set-l"><img src="/static/images/problem.png" alt="" class="img">
                <span>问题中心</span>
              </div>
              <div class="set-r">
                <img src="/static/images/next.png" alt="" >
              </div>
            </div>
            <!--</div>-->
        <div class="set" @click="setIn">
          <div class="set-l"><img src="/static/images/set.png" alt="" class="img">
            <span>设置</span>
          </div>
          <div class="set-r">
            <img src="/static/images/next.png" alt="" >
          </div>
        </div>
        <!--</div>-->


      </div>



     <footer-navs></footer-navs>
  </div>

</template>

<script>
  export default {
      name: "mine",
      data(){
        return{
            show:true,
            name:"",
            headImgUrl:""
        }
      },
      created(){

          // 获取用户 个人资料
          var self = this;
          var url ="webchat/wxUser";
          // var url ="wx/selectBygrade";
          var config = {headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};

          self.$Ajax.post(url,
              self.$qs.stringify({

              }),config)
          .then((res) => {
            console.log(res)
              this.GLOBAL.USERINFO = res.data.data
              this.GLOBAL.CODE = res.data.data.openId
              window.localStorage.setItem(this.GLOBAL.CODE,res.data.data)

              this.show = false
              this.name = res.data.data.name
              this.headImgUrl = res.data.data.headImgUrl
              // var username = res.data.data.name
              console.log("code:"+this.GLOBAL.CODE)
              // this.name = username
          })

      },
      methods:{
        GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                console.log(r)
                if (r != null) return unescape(r[2]); return null;
            },
          //订单页面跳转到相应的页面
          clickOrderStatus(item){
              if(this.name == "" || this.name == null){
                  //跳转到login界面
                  //要延时执行的代码
                  this.$router.push({
                      path:'/loginR',
                      name:'loginR',
                  })
              } else {
                  if (item == 0) {
                      this.$router.push({
                          path: '/order/index',
                          name: 'order',
                          params: {
                              act: 1,
                          },
                      })
                  } else if (item == 1) {
                      this.$router.push({
                          path: '/order/index',
                          name: 'order',
                          params: {
                              act: 2,
                          },
                      })
                  } else if (item == 2) {
                      this.$router.push({
                          path: '/order/index',
                          name: 'order',
                          params: {
                              act: 3,
                          },
                      })
                  } else if (item == 3) {
                      this.$router.push({
                          path: '/order/index',
                          name: 'order',
                          params: {
                              act: 4,
                          },
                      })
                  } else if (item == 4) {
                      this.$router.push({
                          path: '/order/index',
                          name: 'order',
                          params: {
                              act: 5,
                          },
                      })
                  }
              }
          },
          // 全部订单
          orderIn(){
              if(this.name == "" || this.name == null){
                  //跳转到login界面
                  //要延时执行的代码
                  this.$router.push({
                      path:'/loginR',
                      name:'loginR',
                  })
              }else {
                  this.isShow = false;
                  this.$router.push({
                      path:'/order/index',
                      name:"order",
                  })
              }

            },
          // 设置
          setIn(){
              if(this.name == "" || this.name == null){
                  //跳转到login界面
                  //要延时执行的代码
                  this.$router.push({
                      path:'/loginR',
                      name:'loginR',
                  })
              } else {
                  this.$router.push({
                      path: '/set/index',
                      name: "set",
                  })
              }
           },
          //  我的积分
          integralIn(){
              if(this.name == "" || this.name == null){
                  //跳转到login界面
                  //要延时执行的代码
                  this.$router.push({
                      path:'/loginR',
                      name:'loginR',
                  })
              } else {
                  this.$router.push({
                      path: '/integral/index',
                      name: 'integral',
                  })
              }
          },
          // 邀请有礼
          inviteIn() {
              if (this.name == "" || this.name == null) {
                  //跳转到login界面
                  //要延时执行的代码
                  this.$router.push({
                      path: '/loginR',
                      name: 'loginR',
                  })
              } else {
                  this.$router.push({
                      path: '/friends/index',
                      name: 'friends',
                  })
              }

          },
          // 问题中心
          questionIn() {
              if (this.name == "" || this.name == null) {
                  //跳转到login界面
                  //要延时执行的代码
                  this.$router.push({
                      path: '/loginR',
                      name: 'loginR',
                  })
              } else {
                  this.$router.push({
                      path: '/question/index',
                      name: 'question',
                  })
              }
          }
    }
  }
</script>

<style scoped>
   .mine {
       overflow: hidden;
       /*padding-top: 60px;*/
   }
   .photo {
       width: 7.5rem;
       height: 4.95rem;
       background: url("/static/images/mine.png") center top no-repeat;
       background-size:100% 61%;

   }
  .photo-t {
    height: 2.06rem;

    text-align: center;
    padding-top: 0.49rem;
  }
   .photo-t img{
     width: 1.18rem;
     height: 1.18rem;

   }
   .photo-t a{
     display: block;
     font-size: 0.34rem;
     font-weight: normal;
     font-stretch: normal;
     letter-spacing: 0;
     color: #ffffff;
   }
  .photo-b {
    /*width: 7.0rem;*/
    height: 2.4rem;
    margin:0 0.24rem;
    background-color: #ffffff;
    box-shadow: 0 2rem 9rem 0
    rgba(0, 34, 61, 0.06);
    border-radius: 0.04rem;

  }
   .photo-order {
     height: 0.88rem;
     line-height: 0.88rem;
     padding: 0 0.32rem;
     font-size: 0.3rem;
     border-bottom: 2px solid #eeeeee;
   }
   .order-l{
     float: left;
   }
   .order-l span{
     font-size: 0.28rem;
     color: #333;
     font-weight: bold;
   }
   .order-r{
     float: right;
   }
   .order-r span {
     display: block;
     float: left;
      color: #777777;
     font-size: 0.28rem;
     font-weight: bold;
   }
   .order-r .img {
     padding-top: 0.2rem;
   }
   .order-r img{

      width: 0.24rem;
      height: 0.48rem;
   }
  .order-ul {
    font-size: 0.3rem;
    padding-top: 0.35rem;
    padding-left: 0.3rem;

  }
   .order-ul ul li {
        float: left;
        width: 1.32rem;
        display: block;
        text-align: center;

   }
   .order-ul li img{
     width: 0.46rem;
     height: 0.46rem;
   }
   .order-ul li span{
    display: block;
     color: #777;
     font-size: 0.22rem;
   }

   .integral {
     background: #fff;
     margin: 0.2rem 0.24rem 0 0.24rem;
     height: 4.04rem;
     box-shadow: 0 0.02rem 0.09rem 0
     rgba(0, 34, 61, 0.06);
     border-radius: 0.04rem;
   }

   .set {
     margin:0 0.28rem;
     height: 1rem;
     line-height: 2rem;
     font-weight: bold;
     border-bottom:1px solid #eeeeee;

   }
   .set img {
     width: 0.27rem;
     height: 0.27rem;
     float:left;
   }

   .set span {
      float: left;
      font-size: 0.26rem;
      color: #333;
   }

   .set-l {
     float: left;
     line-height: 1rem;
   }
   .set-l img{
     padding-top: 0.4rem;

   }
   .set-l span{
     padding-left: 0.3rem;

   }
   .set-r {
     float: right;
     padding-top: 0.3rem;
   }

</style>
