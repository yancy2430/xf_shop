<template>
  <!--  我的 设置页面  -->
   <div class="set">
     <ul>
       <li class="h170" @click="nameImgIn">
           <label>头像</label>
           <img src="/static/images/usre-1.png" alt="" class="img">

       </li>
       <li @click="usernames">
           <label>姓名</label>
           <input type="text"  v-model="username"  name="username" class="inputTel" placeholder="">
           <img src="/static/images/next.png" alt="" class="img">
       </li>
       <li @click="iphoneIn">
           <label >手机</label>
           <input type="text"  v-model="phone"   name="username" class="inputTel" placeholder="">
           <img src="/static/images/next.png" alt="" class="img">
       </li>
       <li @click="WeChatIn">
         <label>微信号</label>

         <img src="/static/images/next.png" alt="" class="img">
       </li>
       <li @click="emallIn">
         <label >邮箱</label>

         <img src="/static/images/next.png" alt="" class="img">
       </li>
       <li @click="profileIn">
         <label>收货地址</label>

         <img src="/static/images/next.png" alt="" class="img">
       </li>
       <li @click="inviteIn">
         <label >邀请有礼</label>

         <img src="/static/images/next.png" alt="" class="img">
       </li>
       <li @click="exitIn">
         <label>退出登录</label>

         <img src="/static/images/next.png" alt="" class="img">
       </li>

     </ul>

       <!--  修改姓名 弹窗  -->
       <div class="purchase" v-if="isShow">

           <div class="pur">
               <h2>修改姓名</h2>
               <div class="input">
                   <input type="text" v-model="amendname" placeholder="请输入姓名">
               </div>

               <p>
                   <span @click="cancelIn">取消</span>
                   <span @click="affirmIn">确认</span>
               </p>
           </div>
       </div>

   </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    export default {
        name: "index",
        data(){
            return{
                isShow:false,
                amendname:'', // 修改的用户名
                username :'', // 注册时的用户名
                phone:this.phone,
                wechat:'',
                email:'',
                profile:''


              }
        },
        created(){
            console.log(this.GLOBAL.USERINFO)
            // 获取账户的id
            var userId = window.localStorage.getItem(this.GLOBAL.CODE);
            // console.log(userId)
            this.userId = this.GLOBAL.USERINFO.userId;
            // 获取账户的用户名
            var name = window.localStorage.getItem(this.GLOBAL.NAME);
            // console.log(name)
            this.username = this.GLOBAL.USERINFO.name;
        },
        methods:{
            // 修改头像
            nameImgIn(){},
            // 修改用户名
            usernames(){
                this.isShow = true;
            },
            // 取消 修改名称
            cancelIn(){
                this.isShow = false
            },
            // 确认 修改名称
            affirmIn(){
                var self = this;
                var url ="wx/center/updateByName";
                var config = {headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
                //  数据交互
                self.$Ajax.post(url,
                    self.$qs.stringify({
                        name:self.amendname,
                        userId:self.userId

                    }),config)
                .then((res) => {
                    // console.log(res);
                    self.username = self.amendname
                    self.amendname ="";
                    window.localStorage.setItem(this.GLOBAL.NAME, self.username);
                    // var name = window.localStorage.getItem(this.GLOBAL.NAME)
                    // console.log("用户名:"+name)

                })
                this.isShow = false;

            },

            iphoneIn (){
                  this.$router.push({
                        path:'/set/setIhpone',
                        name:'setIhpone',
                  })
            },
            // 修改邮箱
            emallIn(){
                  this.$router.push({
                        path:'/set/setEmall',
                        name:'setEmall',
                  })
            },
            WeChatIn() {
                let nowUrl='http://xiaofeng.ckugua.com/index.html';
                window.location.href='http://xiaofeng.ckugua.com/webchat/authorize?url='+nowUrl
                console.log(nowUrl)
            },
            profileIn(){
                  this.$router.push({
                      path:'/set/setAddress',
                      name:'setAddress',
                  })
            },
            inviteIn(){
                  this.$router.push({
                      path:'/friends/index',
                      name:'friends',
                  })
            },
            exitIn(){
                localStorage.clear(this.userId)
                this.$router.push({
                    path:'/loginR',
                    name:'loginR',
                })

            }
        }
    }
</script>

<style scoped>
  .set {
    width: 7.02rem;
    margin: 0 0.24rem;
  }
  .set li.h170 {
    height: 1.7rem;
    line-height: 1.7rem;
  }
  .set li.h170 img{
    width: 1rem;
    height: 1rem;
  }
  .set ul li {
    height: 1.04rem;
    line-height: 1.04rem;
    padding: 0 0.22rem 0 0.13rem;

    border-bottom:0.02rem solid #eeeeee;
  }
  .set ul li:hover {
    cursor: pointer;
    /*background: aqua;*/
  }
  .set label{
    width: 1.3rem;
    display: block;
    float: left;
    font-size: 0.28rem;
  }

  .set input{
     float: left;
     background: none;
     border: none;
     text-align: right;
     width: 4.74rem;
     height: 1.02rem;
     line-height: 1.02rem;
     font-size: 0.28rem;
  }
  .set .img {
    padding-top: 0.3rem;
  }
  .set img{
    float: right;
    width: 0.3rem;
    height: 0.3rem;
  }
  .purchase {
      width: 7.5rem;
      position: fixed;
      background-color:rgba(0,0,0,0.3);
      height: 100%;
      top:60px;
      left: 0;
      z-index: 99;
  }
  .pur {
      width: 6.1rem;
      height: 2.88rem;
      position: absolute;
      top: 3.95rem;
      left: 0.7rem;
      background:#fff;
      border-radius: 0.1rem;

  }
  .pur h2{
      font-family: PingFangSC-Regular;
      font-size: 0.3rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 0.96rem;
      height: 0.96rem;
      text-align: center;
      letter-spacing: 3px;
      color: #333333;
  }
  .pur .input{
      width: 5.26rem;
      height: 0.92rem;

  }
  .pur .input input{
      width: 5.26rem;
      margin:0 0.4rem;
      height: 0.6rem;
      line-height: 0.6rem;
      border: 0.02rem solid #ccc;
      text-align: left;
      text-indent: 1em;
      font-size: 0.32rem;
  }
  .pur .input input::placeholder {
        color: #ccc;
        font-size: 0.24rem;
  }
   .pur p {
       border-top: 0.02rem solid #eee;
       height: 0.98rem;
       line-height: 0.98rem;
   }
  .pur p  span {
      display: inline-block;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 0.3rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 3px;
      float: left;
      text-align: center;
  }
  .pur p span:nth-child(1) {
      width: 3.04rem;
      color: #333333;
      border-right: 0.02rem solid #eee;
  }
  .pur p span:nth-child(2) {
      color: #0290fe;
      width: 3.04rem;

  }



</style>
