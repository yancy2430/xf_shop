<template>
    <!-- 微信授权   -->
    <div class="warranty">
       <div class="imgLogin">
             <img src="/static/images/logo.png" alt="">
             <p>晓风科技</p>
       </div>
      <div class="titleT">
            <div class="title">登录后应用将获得以下权限</div>
            <div class="text">
              <div class="point"></div>
              <div class="message">获得你的公开信息（昵称、头像、地区及性别）</div>
            </div>
      </div>
      <span class="commit" @click="referIn">确认提交</span>

    </div>
</template>

<script>
    export default {
        name: "setWarranty",
        data(){
            return{
                openId:'',
                nickname:'',
                headimgurl:''

            }
        },
        created(){
            // var name = window.localStorage.getItem(this.GLOBAL.CODE);
            // console.log(name)
            // // this.iphone = name;
            // this.userId = name
            // // console.log(this.userId)
            //
            //
            // var self = this;
            // var url ="webchat/authorize";
            // var config = {headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
            // //  数据交互
            // self.$Ajax.get(url,
            //     self.$qs.stringify({
            //     }),config)
            // .then((res) => {
            //     console.log(res.data);
            //
            //
            //
            //
            //
            // })

        },
        methods:{
            referIn(){
                var self = this;
                var url ="webchat/authorize";
                var config = {headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
                //  数据交互
                self.$Ajax.get(url,
                    self.$qs.stringify({
                        // userId:self.userId,
                        // openId:self.openId,
                        // nickname:self.nickname,
                        // headimgurl:self.headimgurl

                    }),config)
                .then((res) => {
                    console.log(res);
                    var self = this;
                    var url ="webchat/wxUser";
                    var config = {headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};
                    //  数据交互
                    self.$Ajax.post(url,
                        self.$qs.stringify({
                            userId:self.userId,
                            openId:self.openId,
                            nickname:self.nickname,
                            headimgurl:self.headimgurl

                        }),config)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((error) => {
                        console.log(error)
                    });

                })
            }

        }
    }
</script>

<style scoped>

  .warranty {
      /*background: red;*/
      height: 300rem;

  }
  .imgLogin {
    width: 6.15rem;
    height: 3.9rem;

    text-align: center;
    margin: 0 auto;
    border-bottom: 1px solid #cccccc;

  }
  .imgLogin img{
    margin-top: 1.1rem;
    width: 1.5rem;
    height: 1.5rem;
  }
  .imgLogin p{
      /*margin-top: 0.17rem;*/
     font-size: 0.4rem;
     color: #333;
     text-align: center;
     font-weight: bold;
  }
  .titleT {
      height: 3.4rem;
      font-size: 0.5rem;
    margin: 0 0.73rem;
  }
  .title {
     height: 1.6rem;
     line-height: 1.6rem;
     font-size: 0.32rem;
     color: #333;
  }
  .text {

  }
  .text .point{
    width: 0.18rem;
    height: 0.18rem;
    background-color: #cfd8e1;
    border-radius: 0.18rem;
    float: left;
    margin-top: 0.36rem
  }
  .text .message{
     margin-left:0.3rem;
     width:4.9rem;
     float: left;
     font-size: 0.3rem;
     line-height: 0.45rem;
     color: #999999;



  }
  .commit {
    display: block;
    font-size: 0.3rem;
    text-align: center;
    height: 0.8rem;
    line-height: 0.8rem;
    color: #fff;
    background: #0290fe;
    margin: 0.2rem 0;
  }
  .commit:hover {
    cursor: pointer;
  }

</style>
