<template>
    <!--  我的 个人中心  设置新的手机号  -->
     <div class="newIphone">
       <ul class="iphoneIn">
         <li>
           <label>新手机号</label>
           <input type="text"  v-model="phone" placeholder="请输入您的手机号" class="iphone">
         </li>
         <li>
           <label>验证码</label>
           <input type="text" v-model="code"   placeholder="请输入短信验证码" class="code">
           <span class="getCode" @click="getCode">{{time}}</span>
         </li>
       </ul>
       <span class="commit" @click="inRegsiter">确认提交</span>
       <span class="backtrack" @click="$router.back(-1)">返回</span>
     </div>
</template>

<script>
    export default {
        name: "newIphone",
        data(){
            return {
                phone:'',
                code:'',
                userId:'',
                time:'获取验证码'
            }
        },
        created(){
            var name = window.localStorage.getItem(this.GLOBAL.CODE);
            console.log(name)
            // this.iphone = name;
            this.userId = name
            console.log(this.userId)
        },
        methods:{
            inRegsiter:function() {

                let self = this;
                let url = "wx/center/updateByphone";
                let config = {headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
                //  实现数据交互
                self.$Ajax.post(
                    url,
                    self.$qs.stringify({
                        userId:this.userId,
                        phone:self.phone,
                        // code:self.invitation,
                    }),
                    config)
                .then((res) => {
                    console.log(res);
                    var codes = res.data.code;
                    // console.log(res.data);
                    if (codes == 200) {

                        self.$toast({
                            message: '手机号修改成功',
                            duration: 1000,

                        });
                        setTimeout(function () {
                            //要延时执行的代码
                            // self.$router.push({
                            //
                            // })
                            // 清除密码
                            self.phone ="";

                        }, 1000)
                        console.log(res.data.data.userId);

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
                let url = "wx/registerSend";
                let config = {headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
                //  实现数据交互
                self.$Ajax.post(
                    url,
                    self.$qs.stringify({
                        phone:self.iphone,
                        userId:self.userId
                    }),
                    config)
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
                        var timer = setInterval(function () {
                            if(num == 0 ){
                                num = 60;
                                clearInterval(timer)  // 停止定时器
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
        }
    }
</script>

<style scoped>

  .newIphone{
    width: 7.02rem;
    margin: 0.24rem 0.24rem 0 0.24rem;
  }
  .newIphone span {
    display: block;
  }
  .newIphone ul.iphoneIn {
    background: #fff;
  }
  .newIphone ul.iphoneIn li {
    height: 1.1rem;
    line-height: 1.1rem;
    margin:0 0.3rem;
    padding: 0 0.38rem;
  }
  .newIphone ul.iphoneIn li:first-child {
    border-bottom:0.02rem solid #eeeeee;
  }
  .newIphone ul li:hover {
    cursor:hand;
    /*background: aqua;*/
  }
  .newIphone label{
    width: 1.3rem;
    display: block;
    float: left;
    font-size: 0.28rem;
    color: #777;
  }

  .newIphone input{

    float: left;
    background: none;
    border: none;
    text-align: left;
    height: 1.1rem;
    line-height: 1.1rem;
    font-size: 0.24rem;
    text-indent: 1em;
    color: #aaa;
  }
  .newIphone .iphoneIn .iphone{
    width: 4.36rem;
  }
  .newIphone .iphoneIn .code{
    width: 2.9rem;
    float: left;
  }
  .getCode {
    margin-top: 0.3rem;
    float: right;
    width: 1.33rem;
    color: #0290fe;
    font-size: 0.2rem;
    line-height: 0.5rem;
    text-align: center;
    height: 0.5rem;
    border-radius: 0.04rem;
    border: solid 2px #0290fe;

  }
  .commit, .backtrack{
    width: 7.02rem;
    line-height: 0.8rem;
    font-size: 0.28rem;
    text-align: center;
    height: 0.8rem;
    box-shadow: 0px 2px 9px 0px
    rgba(0, 34, 61, 0.06);
  }
  .commit {
    color: #fff;
    background: #0290fe;
    margin: 0.2rem 0;
  }
  .backtrack {
    background:#fff ;

  }

</style>
