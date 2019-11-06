<template>
      <div class="telpass " id="login">
            <div v-if="isShowVisibile">
                <div class="telName">
                    <label class="input-tips"><img src="/static/images/user.png" alt=""></label>
                    <input type="text" v-model="phone" name="username" class="inputTel" placeholder="请输入账号" @blur='validatePhone(phone)'>
                </div>
                <div class="telCaptcha">
                    <label class="input-tips"><img src="/static/images/pass.png" alt=""></label>
                    <input type="password" v-model="password" name="pass" class="inputTel" placeholder="请输入密码" @blur='validatePass(password)'>
                </div>
                <span class="foPass">
                    <router-link :to="{name:'TelPass'}">忘记密码</router-link>
               </span>
                <div class="submit">
                    <button class="button_blue" @click="inLogo">登录</button>
                </div>
                <p @click="handleLogin">快捷登录</p>
            </div>

            <div v-if="!isShowVisibile">
                 <div class="telName">
                      <label class="input-tips"><img src="/static/images/user.png" alt=""></label>
                      <input type="text" v-model="phone" name="username" class="inputTel" placeholder="请输入账号" @blur='validatePhone(phone)'>
                 </div>
                 <div class="telCaptcha">
                      <label class="input-tips"><img src="/static/images/pass.png" alt=""></label>
                      <input type="text" v-model="invitation" name="code"  class="Captcha" placeholder="动态密码">
                      <button class="yzm" :disabled="isdisabled" @click="getCode">{{code}}</button>
                 </div>
                 <div class="submit">
                      <button class="button_blue" @click="inRegsiter">登录</button></div>
                 <p @click="phoneLogin">密码登录</p>
            </div>

        <!--<footer-nav></footer-nav>-->

      </div>
</template>

<script>

  export default {
        name: "telPass",
        data () {
           return {
               isShowVisibile:true,
               phone:'',
               password:'',
               invitation:'',
               isdisabled:false,
               code:"获取动态码"
           }
        },

        reated(){
            // this.phone = "";
            // this.password = '';

        },

         methods:{
             // 验证 手机状态
             validatePhone(phone){
                 var phone = this.phone;
                 var mPattern = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
                 if(!phone) {
                     this.$toast('账号不能为空');
                 } else if(mPattern.test(phone) == false){
                     this.$toast('手机格式错误');
                     this.phone = "";
                 } else {
                 }
             },

             // 验证密码
             validatePass(password){
                 if(!password) {
                     this.$toast('密码不能为空');
                 }
                 if(password.length < 6){
                     this.$toast('密码不能少于6位');
                 }
             },


              //  切换到手机号登录
              handleLogin(){
                 this.isShowVisibile = false
              },
             //  切换到密码登录
              phoneLogin:function () {
                  this.isShowVisibile = true
              },
             //  密码登录
             inLogo(){
                //  调用接口
                 var self = this;
                 // var url = 'http://192.168.0.104:8082/wx/registerByUser';
                 var url = "wx/login";
                 var config = {headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
                 //  数据交互
                 self.$Ajax.post(
                     url,
                     self.$qs.stringify({
                         phone:self.phone,
                         password: self.password,
                     }),
                     config)
                 .then((res) => {
                     // console.log(res.data);
                     var code =res.data.code;
                     if(code == 200){
                         // console.log(self.phone);
                         // console.log(self.password);
                         // console.log('登录成功');
                         //获取 用户名
                         window.localStorage.setItem(this.GLOBAL.NAME, res.data.data.name);
                         var name = window.localStorage.getItem(this.GLOBAL.NAME)
                         // console.log("用户名:"+name)

                         //获取 用户积分
                         window.localStorage.setItem(this.GLOBAL.INTEGRAL, res.data.data.grade);
                         // var name = window.localStorage.getItem(this.GLOBAL.INTEGRAL)
                         // console.log("你的积分:"+name)
                         // 获取用户邀请码
                         window.localStorage.setItem(this.GLOBAL.CODE, res.data.data.userId);
                         var name = window.localStorage.getItem(this.GLOBAL.CODE)
                         // console.log("你的邀请码:"+name)
                         self.$toast({
                             message: '登录成功',
                             duration: 2000,
                             icon: 'success',

                         });
                         setTimeout(function () {
                             //要延时执行的代码
                             self.$router.push({
                                 path: '/',
                                 name: 'index',
                             })
                             // 清除密码
                             self.phone ="";
                             self.password ="";
                         }, 1500)
                     }else {
                         self.$toast({
                             message: res.data.msg,
                             duration: 2000,
                         });
                         setTimeout(function () {
                             //要延时执行的代码
                             // 清除密码
                             self.phone ="";
                             self.password ="";
                         }, 2500)
                     }
                 })
                 .catch((error) => {
                     console.log(error)
                 });
             },
             //  手机验证码登录
             inRegsiter:function () {
                 let self = this;
                 let url = "wx/loginBycode";
                 let config = {headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
                 //  实现数据交互
                 self.$Ajax.post(
                     url,
                     self.$qs.stringify({
                         phone:self.phone,
                         code:self.invitation,
                     }),
                     config)
                 .then((res) => {
                     // console.log(res.data);
                     var codes = res.data.code;
                     // console.log(res.data.data);
                     if (codes == 200) {

                         self.$toast({
                             message: '登录成功',
                             duration: 1000,

                         });
                         setTimeout(function () {
                             //要延时执行的代码
                             self.$router.push({
                                 path: '/',
                                 name: 'index',
                             })
                             // 清除密码
                             self.phone ="";

                         }, 1000)
                         // console.log(res.data.data.userId);

                     } else {
                         self.$toast({
                             message: res.data.msg,
                             duration: 1000,
                         });
                     }

                 })
                 .catch((error) => {
                     console.log(error)
                 })
             },


             //  获取手机验证吗
             getCode(){
                let self = this;
                let url = "wx/loginTosend";
                let config = {headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
                //  实现数据交互
                self.$Ajax.post(
                    url,
                    self.$qs.stringify({
                        phone:this.phone,
                    }),
                    config)
                    .then((res) => {
                        // console.log(res.data);
                        var code = res.data.code;
                        if (code == 200) {
                            self.$toast({
                                message:'验证码发送成功',
                                duration: 1000,
                                icon: 'success',

                            });
                            //  当数据请求成功时 启动定时器 倒计时
                                let num = 60;
                                var time = setInterval(function () {
                                    if(num == 0 ){
                                        num = 60;
                                        clearInterval(time)  // 停止定时器
                                        self.code = "发送验证码"
                                        self.isdisabled = false
                                    } else {
                                        self.code = num + "s后重新发送";
                                        self.isdisabled = true
                                    }
                                    --num;
                                },1000)

                        } else {
                            self.$toast({
                                message:res.data.msg,
                                duration: 1000,
                            });
                            setTimeout(function () {
                                // 清除密码
                                self.phone ="";

                            }, 1000)
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
             },






        }
  }
</script>

<style scoped>

  .telpass {
      width: 5.9rem;
    margin: 0.85rem;
  }
  .telpass img{
     width: 0.45rem;
    padding-top: 7px;
  }
  .telName,.telCaptcha {
    width: 100%;
    height: 0.9rem;
    line-height: 0.9rem;
    border-bottom: 0.01rem solid #cfd8e1;
    padding-top: 0.3rem;
    font-size:0.1rem;

  }
  .input-tips {
    width: 0.7rem;
    float: left;
  }
  .input-tips img {
       width: 0.32rem;
       padding-top: 0.3rem;
   }
  .inputTel,.Captcha {
      margin-top: 0.25rem;
      height: 0.5rem;
      line-height:0.5rem;
      float: left;
      border: none;
      font-size: 0.32rem;
      border: none;
  }
  .inputTel{
    width: 5.1rem;
  }
  .Captcha {
    width: 3.1rem;
  }
  .yzm {
      width: 2.1rem;
      margin-top: 0.3rem;
      text-align: right;
      font-size: 0.28rem;
      float: right;
      background:#f8f8f8;
      border: none;
      cursor: pointer;


  }
  .submit {
    padding-top: 0.8rem;
  }
  input::-webkit-input-placeholder {
    color: #aab2bd;
    font-size: 0.28rem;
    text-align: left;
    font-family: PingFang-SC-Medium;
    color: #b9c5d5;
  }
  .button_blue {
    width: 100%;
    height: 0.8rem;
    color: #ffffff;
    font-size: 0.32rem;
    background-color: #0290fe;
    box-shadow: 0px 6px 10px 0px
    rgba(2, 144, 254, 0.3);
    border-radius: 0.4rem;
    border: none;
  }


  .telpass span.foPass {
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: right;
    font-size: 0.28rem;
    display: block;
    color: #b9c5d5;

  }
  .telpass span.foPass a{

      color: #b9c5d5;

  }
  .telpass p {
    color: #666666;
    font-size: 0.32rem;
    text-align: center;
    height: 60px;
    line-height: 60px;
    padding-top: 0.34rem;
  }
  .telpass p a{
    text-decoration: none;
  }
</style>
