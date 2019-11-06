<template>
  <div class="telpass">

    <div class="telName">
      <label class="input-tips"><img src="/static/images/user.png" alt=""></label>
      <input type="text" v-model="password" name="pass" class="inputTel" placeholder="请输入新密码" @blur="validatePassword(password)">
    </div>
    <div class="telCaptcha">
      <label class="input-tips"><img src="/static/images/user.png" alt=""></label>
      <input type="text" v-model="pass" name="passwoed" class="inputTel" placeholder="请输入新密码">
    </div>
    <div class="submit">
      <button class="button_blue" @click="inTo()">确定</button>
    </div>

  </div>
</template>

<script>
    import { MessageBox } from 'mint-ui'
  export default {
    name: "telPass",
      data(){
        return{
            phone:this.$route.params.phone,
            password:'',
            pass:'',

        }
      },
    methods:{
        //  验证密码的是否符合规则
        validatePassword(password){
            if(!password) {
                this.$toast("密码不能为空");

            }
            if(password.length < 6 && password.length > 0){
                this.$toast('密码不能少于6位');
            }
        },

       //  密码修改是否成功
       inTo () {
           // console.log(1)
           var password = this.password;
           var pass = this.pass;
           if(password===pass){
               //  调用接口
               var self = this;
               // var url = 'http://192.168.0.104:8082/wx/registerByUser';
               var url = "wx/forgetByPassword";
               var config = {headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
               //  数据交互
               self.$Ajax.post(
                   url,
                   self.$qs.stringify({
                       phone:self.phone,
                       password:self.password
                   }),
                   config)
               .then((res) => {
                   console.log(res.deta)
                   if(res.data.code == 200){
                       if(!password){
                           self.$toast({
                               message: '密码不能为空',
                               duration: 1000,
                               icon: 'success',

                           });
                       }else if(password.length < 6 && password.length > 0){
                           self.$toast({
                               message: '密码不能少于6位',
                               duration: 1000,
                               icon: 'success',

                           });
                       }else {
                           self.$toast({
                               message: '密码修改成功',
                               duration: 1000,
                               icon: 'success',

                           });
                           setTimeout(function () {
                               //要延时执行的代码
                               self.$router.push({
                                   path:'/loginR',
                                   name:'loginR',
                               })
                           }, 1500)
                       }





                   }
               })
               .catch((error) => {
                   console.log(error)
               })

           } else {
               this.$toast("两次密码不一样");
           }


       }
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
  .inputTel{
    width: 90%;
  }
  .Captcha {
    width: 55%;
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

</style>
