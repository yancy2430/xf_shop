<template>
  <div class="telpass">

      <!--  手机号注册  -->
      <div v-if="isShowVisibile">
          <div class="telName">
              <label class="input-tips"><img src="/static/images/user.png" alt=""></label>
              <input type="tel" v-model='phone'  class="inputTel" placeholder="请输入账号" clearable @blur='validatePhone(phone)'>
          </div>
          <div class="telCaptcha">
              <label class="input-tips"><img src="/static/images/auth.png" alt=""></label>
              <input type="text" v-model="codes" placeholder="请输入短信验证码" class="code">
              <button class="yzm" :disabled="isdisabled" @click="sendCode">{{time}}</button>
          </div>
          <div class="submit">
              <button class="button_blue" @click="validateRegisters">下一步</button>
          </div>

      </div>
      <!-- 分割线  -->
      <!-- 密码设置 -->
      <div v-if="!isShowVisibile">
          <div class="telName">
              <label class="input-tips"><img src="/static/images/pass.png" alt=""></label>
              <input type="password" v-model='password'  class="inputTel" placeholder="请输入密码" @blur='validatePassword(password)'>
          </div>
          <div class="telCaptcha">
              <label class="input-tips"><img src="/static/images/pass.png" alt=""></label>
              <input type="password" v-model='pass' class="inputTel" placeholder="请再次确认密码" @blur='validatePass(pass)'>
          </div>
          <div class="telCaptcha">
              <label class="input-tips"><img src="/static/images/code.png" alt=""></label>
              <input type="text" v-model="invitation"  class="inputTel" placeholder="请输入邀请码（选填）">
          </div>
          <div class="submit">
              <button class="button_blue" @click="validateRegister">注册</button>
          </div>
      </div>

      <!--<footer-nav></footer-nav>-->
  </div>


</template>

<script>
    export default {
        name: "telPass",
        data(){
            return{
                isShowVisibile:'true',  // 显示新的
                phone:'',               // 手机号
                pass:'',                // 密码
                password:'',            // 密码
                invitation:'',          // 邀请码
                codes:'',               // 短信验证码
                time:'获取验证码',
                isdisabled:false,       // 不能点击


            }
        },
        methods:{
            // 验证手机号
            validatePhone(phone){
                var phone = this.phone;
                var mPattern = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
                if(!phone) {
                    this.$toast('账号不能为空');
                } else if(mPattern.test(phone) == false){
                    this.$toast('手机格式错误');
                    this.phoneState='false'
                 } else {
                    this.phoneState='true';
                }
            },
            /// 验证密码
            validatePassword(password){
                 if(!password) {
                     this.$toast('密码不能为空');
                     return;
                 }
                 if(password.length < 6){
                     this.$toast('密码不能少于6位');
                 }
            },
            validatePass(pass){
                if(pass != this.password) {
                    this.$toast('两次密码不一样');
                }
            },



            //   手机注册
            validateRegisters(){
                var phone = this.phone;
                var codes= this.codes;
                if(!phone){
                    this.$toast({
                        message: '手机号不能为空',
                    });
                } else if(!codes) {
                    this.$toast({
                        message: '验证码不能为空',
                    });
                } else {
                    this.isShowVisibile = false
                }
            },
            //  获取验证码
            sendCode(){
                var self = this;
                // 请求验证码 接口
                var url = "wx/registerSend";
                var config = {headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
                //  数据交互
                self.$Ajax.post(url,
                    self.$qs.stringify({
                        phone:self.phone,
                    }),config)
                .then((res) => {
                    console.log(res.data);
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
                                self.time = "发送验证码"
                                self.isdisabled = false
                            } else {
                                self.time = num + "s后重新发送";
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
            //  注册
            validateRegister(){
                if(this.pass == this.password){
                    var self = this;
                    // var url = 'http://192.168.0.104:8082/wx/registerByUser';
                    var url = "wx/registerByUser";
                    var config = {headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
                    //  数据交互
                    self.$Ajax.post(url,
                        self.$qs.stringify({
                            phone:this.phone,
                            password: this.password,
                            invitation: this.invitation,
                        }),config)
                    .then((res) => {
                        console.log(res.data);
                        var code =res.data.code;
                        if(code == 200){

                                self.$toast({
                                    message: '注册成功',
                                    duration: 1000,
                                    icon: 'success',
                                });
                                setTimeout(function () {
                                    //要延时执行的代码
                                    self.$router.push({
                                        path:'/loginR',
                                        name:'loginR',
                                    })
                                    // 清除密码
                                    self.phone ="";
                                    self.password ="";
                                }, 1500)
                            self.$router.push({
                                path:'/loginR',
                                name:'loginR',
                            })
                        } else {
                            self.$toast({
                                message: res.data.msg,
                                duration: 1000,
                            });
                            setTimeout(function () {
                                //要延时执行的代码
                                // 清除密码
                                self.phone ="";
                                self.password ="";
                            }, 1000)

                        }

                    })
                    .catch((error) => {
                        console.log(error)
                    })
                } else {
                    self.$toast('两次密码不一样');
                }

            },
        },


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
        border-bottom: 1px solid #cfd8e1;
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

    }
    .inputTel{
        width: 5.1rem;
    }
    .Captcha {
        width: 3.1rem;
    }

  .yzm {
      width:35%;
      text-align: right;
      font-size: 0.28rem;
  }
  .submit {
      padding-top: 0.8rem;
  }
  input::-webkit-input-placeholder {
      color: #aab2bd;
      font-size: 0.28rem;
      text-align: left;
      font-family: PingFang-SC-Medium;

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
  .getCode {
      margin-top: 0.2rem;
      float: right;
      width: 1.5rem;
      font-size: 0.28rem;
      line-height: 0.5rem;
      height: 0.5rem;
  }
  .telCaptcha .code{
      border: none;
      height: 0.5rem;
      line-height: 0.5rem;
      width: 3rem;
      margin-top: 0.2rem;
      font-size: 0.32rem;
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
</style>
