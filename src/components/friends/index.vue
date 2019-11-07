<template>
    <div>
        <!-- 邀请好礼 -->
        <div class="friends">
            <img src="/static/images/code-1.png" alt="" class="img">
            <p>长按保存二维码可分享</p>
            <p>我的邀请码  {{code}}</p>
            <p>复制邀请码</p>
            <p @click="getConfig">邀请我的好友</p>
            <p @click="friendsList">点击查看邀请记录>></p>
        </div>

        <!-- 分享弹层 -->
        <div class="tancheng" v-show="showFx">
            <div class="tancheng-img">
                <img src="/static/images/fenxiangtc.png" alt="">
                <p @click="tancheng">我知道了</p>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                showFx:false,
                code:'',

            }
        },
        created(){
            var user = JSON.parse(window.localStorage.getItem(this.GLOBAL.CODE))
            console.log(user)
            this.code = user.userId;
        },

       methods:{
           // 显示 隐藏 分享页面
           tancheng(){
               console.log(this.showFx)
               this.showFx = false
           },

           //  分享 调用sdk
           // 微信分参数
           getConfig() {
               this.showFx = true
               // var _this=this;
               // let url = location.href.split('?')[0] //获取锚点之前的链接
               // //let url = 'http://shop.xf-health.com/index.html' //获取锚点之前的链接
               // // console.log(url)
               // _this.$Ajax.post('webchat/config?url=http%3a%2f%2fshop.xf-health.com%2findex.html').then(response => {
               //     // console.log(response)
               //     let res = JSON.parse(response.data.data);
               //     console.log(res)
               //     _this.wxInit(res);
               // })
           },
         friendsList(){
           this.$router.push({
               path:'/friends/friendsList',
               name:'friendsList',
               query:{
                   userId:this.code   // 用户 id
               }
           })
         }
       }
    }
</script>

<style scoped>
    .tancheng {
        position: fixed;
        background-color:rgba(0,0,0,0.7);
        width: 7.5rem;
        height: 100%;
        top: 0;
        left: 0;
    }
    .tancheng img{
        position: absolute;
        top: 0.2rem;
        right: 0.5rem;
        width: 5.61rem;
        height: 3.65rem;
    }
    .tancheng p{
        position: absolute;
        top: 6rem;
        right: 3rem;
        border: 1px dashed #fff;
        color: #fff;
        padding: 0.1rem 0.2rem;
        font-weight: normal;

    }




    .friends {
      /*padding-top: 60px;*/
  }

  .friends .img {
    margin:0 1.95rem;
    width: 3.6rem;
    height: 3.6rem;
    padding-top: 1.3rem;
  }
  .friends .img img {

      width: 3.6rem;
      height: 3.6rem;
  }
  .friends p {
    text-align: center;
    font-weight: normal;
    font-stretch: normal;
  }
  .friends p:nth-child(2) {
      height: 1.25rem;
      line-height: 1.25rem;
      font-size: 0.32rem;
      color: #666666;
     margin-bottom: 0.85rem;

  }
  .friends p:nth-child(3) {
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.42rem;
    color: #0290fe;

  }
  .friends p:nth-child(4) {
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.32rem;
    color: #666666;
    margin-bottom: 0.85rem;
  }
  .friends p:nth-child(5) {
    width: 5.8rem;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.3rem;
    color: #fff;
    box-shadow: 0px 6px 10px 0px
    rgba(2, 144, 254, 0.3);
    border-radius: 0.4rem;
    background-color: #0290fe;
    margin: 0 0.88rem;
  }
  .friends p:nth-child(6) {
    height: 1.3rem;
    line-height: 1.3rem;
    font-size: 0.32rem;
    color: #666666;
    font-size: 0.24rem;
  }


</style>
