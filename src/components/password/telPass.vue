<template>
    <div class="telpass">

        <div class="telName">
          <label class="input-tips"><img src="/static/images/user.png" alt=""></label>
          <input type="text" v-model="phone" name="tel" class="inputTel" placeholder="请输入手机号码">
        </div>
        <div class="telCaptcha">
          <label class="input-tips"><img src="/static/images/auth.png" alt=""></label>
          <input type="text" v-model="invitation" name="Captcha" class="Captcha" placeholder="请输入验证码">
          <span class="yzm" @click="getCode">{{code}}</span>
        </div>
        <div class="submit">
           <button class="button_blue" @click="nextStep">下一步</button>
        </div>

    </div>
</template>

<script>

    export default {
        name: "telPass",
        data(){
            return{
                phone:'',
                invitation:'',
                code:"获取动态码"
            }
        },
        methods:{
            // 验证码 接口
            getCode(){
                let self = this;
                let url = 'wx/loginTosend';
                let config = {headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
                //   数据交互
                self.$Ajax.post(
                    url,
                    self.$qs.stringify({
                             phone:self.phone
                        }),
                    config
                )
                .then((res)=>{
                    console.log(res.data.code);
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
            },

            nextStep:function () {
                //  调用接口
                var self = this;
                // var url = 'http://192.168.0.104:8082/wx/registerByUser';
                var url = "/wx/phoneBycode";
                var config = {headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
                //  数据交互
                self.$Ajax.post(url,
                    self.$qs.stringify({
                        phone:self.phone,
                        code:self.invitation,
                    }),config)
                .then((res) => {
                    console.log(res.data.code);
                    let code =res.data.code;
                    // let iphone = res.data.phone;

                    if(code == 200){
                        self.$toast(res.data.msg);
                        this.$router.push({
                            path:'/password/ChangePass',
                            name:'ChangePass',
                            params:{
                                phone:self.phone,
                            }

                        })
                        localStorage.setItem("iphone",phone);
                    } else {
                        self.$toast(res.data.msg);
                    }


                })
                .catch((error) => {
                    console.log(error)
                })












                // this.$router.push({
                //     path: 'password/ChangePass',
                //     name: 'ChangePass',
                // })
            }
            //  点击跳转
        }
    }
</script>

<style scoped>

   .telpass {
     padding: 10%
   }
   .telName,.telCaptcha {
     width: 100%;
     height: 0.9rem;
     line-height: 0.9rem;
     border-bottom: 2px solid #cfd8e1;
     padding-top: 0.3rem;
     font-size:0.1rem;

   }
   .input-tips {
     width: 10%;
     float: left;
   }
   .inputTel,.Captcha {
     height: 0.9rem;
     line-height:0.9rem;
     float: left;
     border: none;
   }
   input::-webkit-input-placeholder {
     color: #aab2bd;
     font-size: 0.28rem;
     text-align: left;
     font-family: PingFang-SC-Medium;
     color: #b9c5d5;
   }
   .inputTel{
     width: 30%;
   }
   .Captcha {
     width: 55%;
   }
   .yzm {
     width:35%;
     text-align: right;
     font-size: 0.28rem;
     color: #666;
       float: right;
   }
   .submit {
      padding-top: 0.8rem;
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

</style>
